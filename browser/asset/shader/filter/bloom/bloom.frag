uniform float tone;
uniform float strength;
uniform sampler2D texBase;
uniform sampler2D texBlur;

varying vec2 vUv;

void main(void) {
	float treshold = .7;
	float range = .5;
	float intensity = .1;
  // gl_FragColor = texture2D(texBase, vUv) + smoothstep(treshold, treshold+range, texture2D(texBlur, vUv)) * intensity;
  gl_FragColor = texture2D(texBase, vUv) * .5 + texture2D(texBlur, vUv) * .5;
}
