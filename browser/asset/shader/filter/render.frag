
uniform sampler2D uFramebuffer;
uniform vec2 uResolution, uMouse;
uniform float uTime;
varying vec2 vUv;

void main () {
	vec2 p = vUv;
	p = vUv * 2. - 1.;
	p.x *= uResolution.x/uResolution.y;
	vec3 color = vec3(1,0,0);
	gl_FragColor = vec4(color, 1);
}