
attribute vec3 color;
uniform float time;
uniform vec3 satelitte, cameraPos, timeElapsed, satelitteRotation;
varying vec2 vUv;
varying vec3 vNormal, vView, vColor;

// chunk(shadowmap_pars_vertex);

void main () {
	vec3 pos = position;
	pos += satelitte;
	// pos.y += sin(length(pos.xz) * .1 + time) * 4.;
	pos.y -= 2.;
	pos.xz *= rotation(.2 * satelitteRotation.z);
	pos.yz *= rotation(.2 * satelitteRotation.y * step(.01, color.g));
	pos.y += 2.;
	vUv = uv;
	vNormal = normal;
	vView = cameraPos - pos;
	vColor = color;
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  // chunk(shadowmap_vertex);
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}