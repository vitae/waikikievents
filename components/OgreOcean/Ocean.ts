// OgreOcean main logic (adapted for Next.js/React)
// Source: https://github.com/yoyTeam/OgreOcean/blob/main/src/Ocean.ts
// This file expects the shaders to be imported as raw strings.
import * as THREE from 'three';

export default class Ocean {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private mesh: THREE.Mesh;
  private animationId: number | null = null;
  private startTime: number = Date.now();
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
    this.animate = this.animate.bind(this);
    this.animate();
    window.addEventListener('resize', this.onWindowResize);
  }

  private init() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 1);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    this.camera.position.set(0, 10, 30);

    this.scene = new THREE.Scene();

    // Load shaders as raw strings
    // @ts-ignore
    const vertexShader = require('./shaders/ocean.vert').default;
    // @ts-ignore
    const fragmentShader = require('./shaders/ocean.frag').default;

    const geometry = new THREE.PlaneGeometry(100, 100, 256, 256);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
      },
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.scene.add(this.mesh);
  }

  private animate() {
    const elapsed = (Date.now() - this.startTime) / 1000;
    (this.mesh.material as THREE.ShaderMaterial).uniforms.u_time.value = elapsed;
    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  }

  private onWindowResize = () => {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    (this.mesh.material as THREE.ShaderMaterial).uniforms.u_resolution.value.set(width, height);
  };

  public dispose() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.onWindowResize);
  }
}
