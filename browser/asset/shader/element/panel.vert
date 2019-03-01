
uniform float time;
uniform vec3 panel, cameraPos;
varying vec2 vUv;
varying vec3 vNormal, vView, vColor, vWorld;

// chunk(shadowmap_pars_vertex);

void main () {
	vec3 pos = position;
	vUv = uv;
	vNormal = normal;
	vView = cameraPos - pos;
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  vWorld = worldPosition.xyz;
  // chunk(shadowmap_vertex);
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}