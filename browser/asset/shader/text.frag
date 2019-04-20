
uniform sampler2D textTexture;
varying vec2 vUV;

void main () {
	vec4 color = texture2D(textTexture, vUV);
	gl_FragColor = color;
}