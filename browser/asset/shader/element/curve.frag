
varying vec3 vNormal, vView;
varying vec2 vAnchor;

void main () {
	float shade = abs(dot(normalize(vNormal), -normalize(vView)));
	float dist = abs(vAnchor.y);
	shade *= smoothstep(2., .5, dist);
	// shade *= smoothstep(.91,.9, dist);
	// float alpha = (.1/dist);
	// alpha = (1.-dist)*sqrt(alpha);
	gl_FragColor = vec4(1);//.5+.5*shade,0,0,1);
}