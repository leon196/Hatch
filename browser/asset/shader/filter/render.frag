
uniform sampler2D framebuffer, frametarget, bloom, blur;
uniform vec2 resolution, mouse;
uniform float time;
varying vec2 vUv;

void main () {
	vec4 color = texture2D(frametarget, vUv);
	gl_FragColor = vec4(color.rgb, 1);
}