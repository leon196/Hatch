
uniform vec3 sun;
varying vec3 vView, vPos;

void main () {
	float light = clamp(dot(normalize(sun), vec3(0,1,0))*4., 0., 1.);
	vec3 color = orange1 * light;
	gl_FragColor = vec4(color, 1);
}