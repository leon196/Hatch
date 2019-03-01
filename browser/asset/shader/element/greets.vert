
uniform vec3 cameraPos, panel;
uniform float time;

void main () {
	vec3 pos = vec3(position.z, position.y, -position.x);
	pos.z += 105.;
	pos.z += cameraPos.z * 1.1;
	pos.z += time * .5;
	float fade = smoothstep(0., 40., pos.z);
	// pos.y *= smoothstep(10., 50., length(pos - cameraPos));
	pos.x += sin(pos.z*.2)*4.*fade;
	pos.y *= fade;
	pos += panel;
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  // chunk(shadowmap_vertex);
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}