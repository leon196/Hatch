
uniform vec3 cameraPos, cameraTarget;
uniform vec2 resolution;
uniform float time;
uniform vec3 Text, Texting;
varying vec2 vUV;

void main () {

	vec3 pos = position + Text;
	vUV = uv;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
