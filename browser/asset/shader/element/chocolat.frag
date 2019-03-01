
varying vec3 vColor, vNormal, vView;
varying vec2 vUv;

void main () {
	vec3 normal = normalize(vNormal);
	vec3 view = normalize(vView);
	float shade = dot(normal, view)*.5+.5;

	vec3 color = mix(vec3(1), vec3(0.341, 0.231, 0.078)*.25, shade);
	gl_FragColor = vec4(color, 1);
}