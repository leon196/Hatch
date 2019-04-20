
uniform sampler2D framebuffer, frametarget, frameedge, bloom, blur, textTexture, creditTexture, cookieTexture, jobsTexture;
uniform vec2 resolution, mouse;
uniform vec3 Scratch, Texting, Bloom, ExtraBloom, Circle, Circle2, Circle3, TextingScreen, Credits, Cookie, Rideau;
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
	vec4 credit = texture2D(creditTexture, uvtext);
	vec4 jobs = texture2D(jobsTexture, uvtext);

	float lod = 64.;
	float zip = 1.-abs(sin(random(floor(uv.yy*lod)/lod) + time * 2. + uv.y * 4.));
	vec4 creds = mix(credit, jobs, zip);

	vec4 cookie = texture2D(cookieTexture, uvtext);

	title = mix(title, creds, Credits.y);
	title = mix(title, cookie, Cookie.y);

	color = blu + edgy;

	color = mix(color, 1.-color, smoothstep(Circle.y+.01,Circle.y, length(p)));
	color = mix(color, 1.-color, smoothstep(Circle2.y+.01,Circle2.y, length(p)));
	color = mix(color, 1.-color, smoothstep(Circle3.y+.01,Circle3.y, length(p)));

	color = mix(color, 1.-color, title.r * TextingScreen.y);

	color *= Rideau.y;

	gl_FragColor = color;
}
