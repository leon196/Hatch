
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget;
uniform float time;
varying vec3 vNormal, vView;

vec3 displace (in vec2 uv) {
	float size = 0.4;
	float speed = 0.4;
	float range = 4.0;
	float spread = 1.0;
	float height = 0.2;
	float twist = 0.4;
	float jitter = 4.0;
	float variation = 0.9;
	float waveoffset = 0.5;
	float waveheightfrequency = 0.5;
	float wavetwistfrequency = 0.5;
	vec2 aspect = vec2(0.01, 2.0);
	vec3 seed = position;
	float angle = seed.x * 16.0;
	float ratio = mod(time * speed * ((1.0-variation) + variation * abs(seed.y)) + seed.x, 1.0);
	float fade = smoothstep(0.0, 0.1, ratio);
	seed.z += (ratio * 2.0 - 1.0) * range;
	float waveheight = sin(uv.y + seed.z * waveheightfrequency * PI);
	float wavetwist = sin(uv.y + seed.z * wavetwistfrequency * PI);
	vec3 pos = vec3(0);
	pos.y += waveheight * height * ratio;
	pos.xz += uv * size * fade * aspect;
	pos.xy *= rotation(wavetwist * twist * ratio + seed.x * 10.0);
	pos.z += -range + range * 2.0 * ratio;
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