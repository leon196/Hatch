
attribute vec2 anchor, quantity;
attribute vec3 color, next;
uniform vec3 cameraPos, cameraTarget, Geo;
uniform vec2 resolution;
uniform float time;
varying vec2 vUV;
varying vec3 vNormal, vView;

void main () {

	float size = 1./resolution.y;
	float salt = random(quantity.xx);
	size *= step(.7, salt);
	size *= Geo.y;

	vec3 pos = position*1.01;
	vec3 nxt = next;

	float y = anchor.y * .5 + .5;
	vec4 sPos = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
	vec4 sNxt = projectionMatrix * viewMatrix * modelMatrix * vec4(nxt, 1);
	vec2 forward = normalize(sNxt.xy-sPos.xy);
	vec2 right = vec2(forward.y, -forward.x);
	vec2 zw = mix(sPos.zw, sNxt.zw, y);
	gl_Position = vec4(mix(sPos.xy, sNxt.xy, y) + right * anchor.x * size, zw);

	// pos.xy += anchor * size;
	vView = cameraPos - pos;
	vUV = anchor;

	// gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
