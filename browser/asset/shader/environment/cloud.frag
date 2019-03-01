
uniform sampler2D textureCloud;
varying vec3 vView, vPos;
varying vec2 vUv;

void main () {
	gl_FragColor = texture2D(textureCloud, vUv);
}