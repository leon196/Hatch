
uniform vec3 cameraPos, cameraTarget;
uniform vec2 resolution;
uniform float time;
uniform vec3 Text;
varying vec2 vUV;

void main () {

	vec3 pos = position * Text.y;
	vUV = uv;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
