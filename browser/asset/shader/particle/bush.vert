
attribute vec2 anchor, quantity;
uniform float time;
uniform vec2 resolution;
uniform vec3 cameraPos, cameraTarget, sun;
varying vec2 vAnchor;
varying float vBlend;

void main () {
	float size = .1 + .2 * random(quantity.xx);
	float y = (anchor.y * .5 + .5) * 2.;
	vec3 pos = position * 40.;
	pos.y = 0.;
	float angle = quantity.x * TAU;
	// vec3 front = vec3(cos(angle), 0, sin(angle));
	vec3 front = normalize(cameraPos - pos);
	vec3 right = normalize(cross(front, vec3(0,1,0)));
	pos += (right * anchor.x + vec3(0,1,0) * y) * size;
	vAnchor = anchor;
	gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1);
}