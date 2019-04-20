
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget, Points, Scratch, Dust, Curves;
uniform vec2 resolution;
uniform float time;
varying vec2 vUV;
varying vec3 vNormal, vView;

void main () {

	float salt = random(quantity.xx);
	float size = .1 * Curves.y;

	float y = sin(time + anchor.y);
	float fade = y*.5+.5;
	vec3 pos = mix(vec3(0), position, fade);
	vec3 forward = normalize(cameraPos - pos);
	vec3 right = normalize(cross(forward, vec3(0,1,0)));
	vec3 up = normalize(cross(right, forward));
	pos.y += anchor.y;

	pos += (anchor.x * right + anchor.y * up) * size;

	vView = cameraPos - pos;
	vUV = anchor;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
