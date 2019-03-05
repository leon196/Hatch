
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget;
uniform float time;
varying vec3 vNormal, vView;

vec3 displace (in vec2 uv) {
	float size = 0.2;
	float speed = 0.1;
	float range = 2.0;
	float spread = 0.2;
	float height = 0.2;
	float twist = 0.4;
	float jitter = 4.0;
	float variation = 0.9;
	float waveoffset = 0.5;
	float waveheightfrequency = 1.0;
	float wavetwistfrequency = 1.0;
	vec2 aspect = vec2(0.01, 1.0);
	vec3 seed = position;
	float angle = seed.x * 16.0;
	float ratio = mod(time * speed * ((1.0-variation) + variation * abs(seed.y)) + seed.x * 0.1, 1.0);
	float fade = smoothstep(0.0, 0.1, ratio);
	seed.z += (ratio * 2.0 - 1.0) * range;
	vec3 pos = vec3(0);
	pos.xz += vec2(uv.x * fade, uv.y) * size * aspect;
	float waveheight = sin((pos.z + seed.z) * waveheightfrequency * PI);
	float wavetwist = sin((pos.z + seed.z) * wavetwistfrequency * PI);
	pos.y += waveheight * height * ratio;
	pos.xy *= rotation(wavetwist * twist * ratio + seed.x * .01);
	pos.z += seed.z;
	pos.xy += vec2(cos(angle), sin(angle)) * spread * ratio;
	return pos;
}

void main () {

	vec3 pos = displace(anchor);

	vec3 north, south, east, west;
	north = south = east = west = vec3(0);
	vec2 unit = vec2(0.1, 0);
	north = displace(anchor+unit.yx);
	south = displace(anchor-unit.yx);
	east = displace(anchor+unit.xy);
	west = displace(anchor-unit.xy);
	vNormal = cross(north-south, east-west);
	vView = cameraPos - pos;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}