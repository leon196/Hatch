
varying vec3 vColor, vNormal, vView;

void main () {
	float shade = dot(normalize(vNormal), normalize(vec3(0,1,0)));
	shade = abs(shade);
	// float shade = 1.-abs(dot(normalize(vNormal), normalize(vView)));
	// shade = shade * .5 + .5;
	// shade = smoothstep(.0, .5, shade);
	gl_FragColor = vec4(vec3(1), 1);
}