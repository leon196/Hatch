
uniform sampler2D textTexture;
uniform vec3 Scratch, Texting;
uniform float time;
varying vec2 vUV;

void main () {
	vec2 uv = vUV;
	uv.x = 1.-uv.x;

	uv.x += (random(floor(uv.yy*64.+time)/64.)*2.-1.) * Scratch.y;

	vec4 color = texture2D(textTexture, uv);
	gl_FragColor = color * Texting.y;
}