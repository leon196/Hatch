
uniform sampler2D framebuffer, frametarget, bloom, blur, textTexture;
uniform vec2 resolution, mouse;
uniform vec3 Scratch, Text;
uniform float time;
varying vec2 vUv;

void main () {
	vec4 color = texture2D(frametarget, vUv);
	vec4 bloo = texture2D(blur, vUv);
	vec4 edgy = edgeSD(frametarget, vUv, resolution);
	vec2 uvtext = vUv*2.-1.;
	uvtext.x *= resolution.x/resolution.y;
	// uvtext *= rot(PI/4.);
	uvtext.x += (random(floor(uvtext.yy*64.+time)/64.)*2.-1.) * Scratch.y;
	// uvtext *= rot(-PI/4.);
	uvtext = uvtext * .5 + .5;
	vec4 title = texture2D(textTexture, uvtext);
	float gray = luminance(color.rgb);
	// gray = smoothstep(.7, 1., gray);
	// color = vec4(gray);
	color = vec4(0);
	// color += bloo;
	color += vec4(luminance(edgy.rgb));
	color += title * Text.y;
	// vec4 blurry = texture2D(blur, vUv);
	// float depth = smoothstep(2.0, 0.0, color.w);
	// depth *= smoothstep(2.0, 1.0, color.w);
	// color = mix(color, blurry, depth);
	// color += blurry * 4.0;
	// color *= depth;
	gl_FragColor = vec4(color.rgb, 1);
}
