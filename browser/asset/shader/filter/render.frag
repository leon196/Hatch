
uniform sampler2D framebuffer, frametarget, bloom, blur;
uniform vec2 resolution, mouse;
uniform float time;
varying vec2 vUv;

void main () {
	vec4 color = texture2D(frametarget, vUv);
	vec4 blurry = texture2D(blur, vUv);
	float depth = smoothstep(4.0, 0.0, color.w);
	// color = mix(color, blurry, depth);
	color += blurry * 4.0;
	gl_FragColor = vec4(color.rgb, 1);
}