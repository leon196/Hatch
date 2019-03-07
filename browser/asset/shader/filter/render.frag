
uniform sampler2D framebuffer, frametarget, bloom, blur;
uniform vec2 resolution, mouse;
uniform float time;
varying vec2 vUv;

void main () {
	vec4 color = texture2D(frametarget, vUv);
	vec4 blurry = texture2D(blur, vUv);
	float depth = smoothstep(2.0, 0.0, color.w);
	// depth *= smoothstep(2.0, 1.0, color.w);
	// color = mix(color, blurry, depth);
	// color += blurry * 4.0;
	color *= depth;
	gl_FragColor = vec4(color.rgb, 1);
}