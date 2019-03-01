
varying vec2 vAnchor;
varying vec3 vColor;

void main () {
	if (length(vAnchor) > 1.) discard;
	float dist = clamp(length(vAnchor), 0., 1.);
	float shade = (1.-dist)*.2/dist;
	// gl_FragColor = vec4(1,1,1,shade);
	gl_FragColor = vec4(shade);
}