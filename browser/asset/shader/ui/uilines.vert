
attribute vec2 anchor, quantity;
uniform float time, timeLoop;
uniform vec2 resolution;
varying vec2 vAnchor, vQuantity, vScreen;

void main () {
	vec3 seed = position;
	vec2 pos = vec2(0);
	vec2 pivot = anchor;
	vec2 q = quantity;
	float lod = 20.;
	q.x = ceil(q.x * lod) / lod;
	q.x = mod(q.x - timeLoop * .1, 1.);
	vec2 size = vec2(1.,.1);
	pos += pivot * size;// * vec2(resolution.y/resolution.x, 1);
	// pos *= rotation(timeLoop + quantity.x);
	pos.y += (q.x * 2. - 1.) * 1.1;
	vAnchor = anchor;
	vQuantity = q;
	vScreen = pos * .5 + .5;
	gl_Position = vec4(pos, quantity.x, 1);
}