
uniform sampler2D framebuffer;
uniform vec2 resolution, mouse;
uniform float time;
varying vec2 vUv;

void main () {
	// vec2 p = vUv;
	// p = vUv * 2. - 1.;
	// p.x *= uResolution.x/uResolution.y;
	vec4 color = texture2D(framebuffer, vUv);

	// vec4 color = vec4(vUv, 0.5+0.5*sin(time), 1);
	gl_FragColor = color;
}