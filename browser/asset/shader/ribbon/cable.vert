
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget, panel;
uniform vec2 resolution;
uniform float time, timeLoop;
varying vec2 vAnchor;
varying vec3 vNormal, vView;

// chunk(shadowmap_pars_vertex);

void displace (inout vec3 pos, float ratio) {
	pos = mix(vec3(0), panel*.9999, ratio);
}

void main () {
	float size = .01 + .001*sin(quantity.x*TAU);
	vec3 pos = position;
	vec3 next = pos;
	// float y = mix(anchor.y)
	float ratio = anchor.y*.5+.5;
	displace(pos, ratio);
	displace(next, ratio + .01);

	float angle = PI * -anchor.x;
	vec2 offset = vec2(cos(angle),sin(angle)) * size;
	pos.xy += offset;

	float salt = random(quantity.xx) * .5 + .5;
	float mess = sin(anchor.y * 30.) * sin(anchor.y * 100. + salt * 10. + anchor.y * 25. + quantity.y * 1.546) * .1 * salt;
	float fade = .01 + .99 * (1.-abs(anchor.y));
	pos.x -= quantity.x * 1. * fade + mess + fade * .5 * sin(anchor.y * 20.);
	pos.y += size/4.;

	vNormal = vec3(offset.xy, 0);
	vView = cameraPos - pos;
	vAnchor = anchor;
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  // chunk(shadowmap_vertex);
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}