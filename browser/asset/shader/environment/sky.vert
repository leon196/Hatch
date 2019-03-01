
uniform vec3 cameraPos;
varying vec3 vView, vPos;

void main () {
	vec3 pos = position + cameraPos;
	vPos = pos;
	vView = cameraPos - pos;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}