// OgreOcean fragment shader
// Source: https://github.com/yoyTeam/OgreOcean/blob/main/src/shaders/ocean.frag

varying vec2 vUv;
varying float vWave;

void main() {
  float blue = 0.5 + 0.5 * vWave;
  gl_FragColor = vec4(0.0, 0.3 + 0.2 * vWave, blue, 1.0);
}
