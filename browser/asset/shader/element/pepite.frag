
uniform float time;

varying vec2 vUv;
varying vec3 vNormal, vView, vColor;

void main () {
	float shade = 1.-abs(dot(normalize(vNormal), -normalize(vView)));
	shade = pow(shade, 2.);
	gl_FragColor = vec4(shade);
}