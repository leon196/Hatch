
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget, Points, Scratching, Dust;
uniform vec2 resolution;
uniform float time;
varying vec2 vUV;
varying vec4 vColor;

void main () {

	float salt = random(quantity.xx);
	float size = .005;
	size *= .1+.9*salt;
	size *= Points.y + Dust.y;
	size *= smoothstep(.0, .5, Scratching.y + Dust.y);
	size *= 1. + 4.*random(quantity.xx+fract(time));


	vec3 pos = position;
	vec3 dir = normalize(pos);
	pos = dir;
	pos += dir * Scratching.y * 2. * salt;
	pos += dir * Dust.y * 2. * salt;
	pos.y += sin(Scratching.y*PI)*.1 * salt;// - Scratching.y * .9 * salt;
	// pos.y = mix(pos.y, -1., Dust.y);
	vec3 forward = normalize(cameraPos - pos);

	vec3 u = vec3(0,1,0);
	u.xy *= rot(time);
	vec3 right = normalize(cross(forward, u));
	vec3 up = normalize(cross(right, forward));

	size *= smoothstep(.5,1.,length(pos-cameraPos));


	pos += (anchor.x * right + anchor.y * up) * size;
	pos += up * sin((anchor.x-salt) * TAU + time) * size;
	pos += right * sin((anchor.y+salt) * TAU + time) * size;
	vColor = vec4(1);
	vUV = anchor;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
