
attribute vec2 anchor, quantity;
uniform float time;
uniform vec2 resolution;
uniform vec3 cameraPos, cameraTarget, sun;
varying vec2 vAnchor;
varying float vBlend;

void main () {
	float size = 10.+30.*random(vec2(quantity.x)*15.546);
	float range = .5;
	// float angle = TAU * random(vec2(quantity.x));
	// float radius = .5 + range * random(vec2(quantity.x)+vec2(10.21,42.124));
	// vec2 pos = vec2(cos(angle), sin(angle)) * radius;
	vec3 pos = mix(sun, -sun, quantity.x);
	vec3 forward = normalize(cameraPos - pos);
	vec3 right = normalize(cross(vec3(0,1,0), forward));
	vec3 up = normalize(cross(right, forward));
	pos += (right * anchor.x - up * anchor.y) * size;
	vAnchor = anchor;
	vBlend = dot(normalize(sun), normalize(cameraTarget - cameraPos)) / 2.;
	gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1);
}