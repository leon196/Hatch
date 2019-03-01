
uniform vec3 sun;
varying vec2 vAnchor;
varying float vBlend;

void main () {
	float dist = length(vAnchor);
	if (dist > 1.) discard;
	float alpha = (1.-dist)*4./dist;
	alpha = clamp(alpha,0.,1.)*.2;
	alpha *= vBlend;//abs(dot(normalize(vCameraDir), vec3(0,1,0)));
	float light = getSunLight(sun);
	gl_FragColor = vec4(1,1,1,clamp(alpha, 0., 1.) * smoothstep(.3, 1., light));
}