
uniform vec3 cameraPos, sun;
varying vec3 vNormal, vView;

void main () {
	vec3 pos = position;
	pos.xyz = vec3(pos.x, pos.z, -pos.y);
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}