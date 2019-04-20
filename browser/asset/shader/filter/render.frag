
uniform sampler2D framebuffer, frametarget, frameedge, bloom, blur, textTexture, textScreenTexture;
uniform vec2 resolution, mouse;
uniform vec3 Scratch, Texting, Bloom, ExtraBloom, Circle, TextingScreen;
uniform float time;
varying vec2 vUv;

void main () {

	vec2 uv = vUv;
	uv = uv * 2. - 1.;
	vec2 p = uv;
	p.x *= resolution.x/resolution.y;
	// uv *= 1.-.5*sin(Circle.y*PI);
	// uv *= rot(Circle.y*TAU);
	// uv = mix(uv, .1/uv, sin(Circle.y*PI));
	uv = uv * .5 + .5;
	// uv.x *= resolution.y/resolution.x;

	vec4 color = texture2D(frametarget, uv);
	vec4 blu = texture2D(blur, uv) * (Bloom.y + ExtraBloom.y);
	vec4 edgy = texture2D(frameedge, uv);
	edgy = clamp(abs(edgy), 0., 1.);

	vec2 uvtext = uv*2.-1.;
	uvtext.x *= resolution.x/resolution.y;
	uvtext.x += (random(floor(uvtext.yy*64.+time)/64.)*2.-1.) * Scratch.y;
	uvtext = uvtext * .5 + .5;
	vec4 title = texture2D(textTexture, uvtext);

	color = blu + edgy;

	float y = Circle.y;
	color = mix(color, 1.-color, smoothstep(y+.01,y, length(p)));

	color = mix(color, 1.-color, title.r * TextingScreen.y);

	gl_FragColor = color;
}
