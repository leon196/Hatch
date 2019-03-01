
varying vec3 vNormal, vView;
varying vec2 vAnchor;

void main () {
	// float shade = (dot(normalize(vNormal), normalize(vView)))*.5+.5;
	float dist = abs(vAnchor.x);
	// shade *= smoothstep(3., .1, dist);
	// dist += smoothstep(.5,1.,abs(vAnchor.y));
	float shade = (1.-dist)*.5/dist;
	gl_FragColor = vec4(shade);
}