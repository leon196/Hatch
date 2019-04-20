
uniform sampler2D framebuffer, frametarget, frameedge, bloom, blur, textTexture;
uniform vec2 resolution, mouse;
uniform vec3 Scratch, Texting, Bloom, ExtraBloom;
uniform float time;
varying vec2 vUv;

void main () {
	vec4 color = texture2D(frametarget, vUv);
	vec4 blu = texture2D(blur, vUv) * (Bloom.y + ExtraBloom.y);
	vec4 edgy = texture2D(frameedge, vUv);
	edgy = clamp(abs(edgy), 0., 1.);

	vec2 uvtext = vUv*2.-1.;
	uvtext.x *= resolution.x/resolution.y;
	uvtext.x += (random(floor(uvtext.yy*64.+time)/64.)*2.-1.) * Scratch.y;
	uvtext = uvtext * .5 + .5;
	vec4 title = texture2D(textTexture, uvtext);

	color = blu + edgy;

	gl_FragColor = color;
}
