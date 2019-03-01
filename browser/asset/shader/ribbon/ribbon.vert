
attribute vec2 anchor, quantity;
uniform sampler2D curvePosition, curveNormal;
uniform vec3 cameraPos, cameraTarget;
uniform float time;
varying vec3 vNormal, vView;
varying vec2 vAnchor;

void main () {
	float size = .01;

	vec3 pos = position;

	float y = anchor.y + time;
	pos.xz *= rotation(y * 2.);
	pos.yz *= rotation(y * 2.);

	pos = normalize(pos) * 2.;
	pos.y += 3.;

	vec3 front = normalize(cameraPos - pos);
	vec3 right = normalize(cross(front, vec3(0,1,0)));
	vec3 up = normalize(cross(front, right));
	pos += (up * anchor.x) * size;

	vView = cameraPos - pos;
	vAnchor = anchor;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}