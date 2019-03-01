
attribute vec2 anchor, quantity;
uniform sampler2D curvePosition, curveNormal;
uniform vec3 cameraPos, cameraTarget;
uniform float time;
varying vec3 vNormal, vView;
varying vec2 vAnchor;

void main () {
	float size = .1;
	float x = anchor.x*.5+.5;
	// x = smoothstep(.0, .5+.5*sin(time), x);
	float speed = .5;
	float ratio = mod(time * speed, 1.);
	// ratio = smoothstep(.4, 1., ratio);
	// x = clamp(x, smoothstep(.5, 1., ratio), smoothstep(.0, .5, ratio));
	// x = mod(x / 2. + time * speed, 1.);
	vec3 pos = texture2D(curvePosition, vec2(x,0)).xyz;
	vec3 next = texture2D(curvePosition, vec2(x+.01,0)).xyz;
	vec3 right = texture2D(curveNormal, vec2(x,0)).xyz;

	vNormal = cross(normalize(pos - next), right);

	pos -= right * anchor.y * size;
	vView = cameraPos - pos;
	vAnchor = anchor;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}