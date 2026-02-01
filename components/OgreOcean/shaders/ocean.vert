// OgreOcean vertex shader
// Source: https://github.com/yoyTeam/OgreOcean/blob/main/src/shaders/ocean.vert

varying vec2 vUv;
varying float vWave;

uniform float u_time;

void main() {
  vUv = uv;
  vec3 pos = position;
  float freq = 0.2;
  float amp = 0.7;
  float wave = sin(pos.x * freq + u_time) * amp;
  pos.z += wave;
  vWave = wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
