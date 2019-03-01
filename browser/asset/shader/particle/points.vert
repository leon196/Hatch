
attribute vec3 color;
attribute vec2 anchor, quantity;
uniform sampler2D curve, curveNormal;
uniform vec3 cameraPos, cameraTarget;
uniform float time;
varying vec2 vAnchor;
varying vec3 vColor;

void main () {
	// float salt = random(position.xz);
	float salt = random(vec2(quantity.xx)*100.);
	float size = .02+.2*salt;
	float speed = .5;
	float ratio = 1.-mod(quantity.x - time * speed, 1.);
	// ratio = smoothstep(.5, 1., ratio);
	size *= smoothstep(.0,.1,ratio) * smoothstep(1.,.9,ratio);
	float range = 4. * ratio * salt;
	// vec3 pos = vec3(range,0,0);
	vec3 pos = position * .1;
	// pos.xz *= rotation(quantity.x * 150.4598);
	// pos.yz *= rotation(quantity.x * 20.1569748);
	// pos.yx *= rotation(quantity.x * 2.1569748);
	vec3 offset = vec3(range,0,0);
	float seed = quantity.x;
	offset.xz *= rotation(seed * 10.4598);
	offset.yz *= rotation(seed * 20.1569748);
	offset.yx *= rotation(seed * 30.5465);

	float x = quantity.x;
	pos = texture2D(curve, vec2(x,0)).xyz;
	pos += offset * 2.;

	vec3 front = normalize(cameraPos - pos);
	vec3 right = normalize(cross(front, vec3(0,1,0)));
	vec3 up = normalize(cross(front, right));

	pos += (right * anchor.x + up * anchor.y) * size;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
	vAnchor = anchor;
	vColor = color;
}