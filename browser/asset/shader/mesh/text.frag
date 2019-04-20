
uniform sampler2D textTexture;
uniform vec3 Scratch, Texting;
uniform float time;
varying vec2 vUV;

void main () {
	vec2 uv = vUV;
	uv.x = 1.-uv.x;

	// float fade = .02/abs(uv.y*2.-1.-.02);
	float fade = smoothstep(.05, .5, abs(uv.y*2.-1.-.02));

	uv.xy += (random(floor((uv.yy+uv.xx)*128.)/128.)*2.-1.) * Scratch.y * fade;

	vec4 color = texture2D(textTexture, uv);
	gl_FragColor = color * Texting.y;
}