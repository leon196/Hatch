
uniform vec3 cameraPos;
varying vec3 vView, vPos;
varying vec2 vUv;

void main () {
	vec3 pos = position;
	pos.xyz = pos.xzy * 8.;
	// pos.y *= -1.;
	pos.y += 100.;
	vPos = pos;
	vView = cameraPos - pos;
	vUv = uv;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}