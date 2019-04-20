uniform float minBright, brighty;
uniform sampler2D texture;

varying vec2 vUv;

void main(void) {
  gl_FragColor = clamp(texture2D(texture, vUv), 0., 1.);
}
