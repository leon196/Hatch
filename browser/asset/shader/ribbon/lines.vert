
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget;
uniform vec2 resolution;
uniform float time;
varying vec2 vAnchor;
varying vec3 vNormal, vView;

void displace (inout vec3 pos, float seed) {
	// float range = 2. * mod(seed, 1.);// * noise(pos*4.);
	float range = 10. + 5. * (sin(seed));// * noise(pos*4.);
	// range *= 1. + .5 * sin(seed);
	// vec3 offset = vec3(range,0,0);
	seed += range;
	pos = vec3(range,0,0);
	pos.xz *= rotation(seed * .4598);
	pos.yx *= rotation(seed * .465);
	pos.yz *= rotation(seed * .15);
	// pos.z += sin(seed);
	// pos += offset;
}

void main () {
	float size = .1;
	vec3 pos = position;
	vec3 next = pos;

	float seed = anchor.y * .5 + quantity.x * 67315.1654 + time;
	displace(pos, seed);
	displace(next, seed + .01);

	vec3 front = normalize(cameraPos - pos);
	// vec3 right = normalize(cross(front, vec3(0,1,0)));
	vec3 right = normalize(pos);
	vec3 up = normalize(cross(front, right));
	pos += (right * anchor.x) * size;

	vNormal = cross(normalize(next-pos), right);
	vView = cameraPos - pos;
	vAnchor = anchor;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}