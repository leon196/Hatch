
uniform float time, timeLoop;
uniform vec3 pepite, cameraPos, timeElapsed;

varying vec2 vUv;
varying vec3 vNormal, vView, vColor;

void anim (inout vec3 p) {
	p.xz *= rot(time * 2.);
	p.yz *= rot(time * .5);
}

void main () {
	vec3 pos = position * 2.;
	anim(pos);
	pos.x *= 16.;
	pos += pepite;
	vNormal = normal;
	anim(vNormal);
	vView = cameraPos - pos;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}