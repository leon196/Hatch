
attribute vec2 anchor, quantity;
uniform vec3 cameraPos, cameraTarget, Points, Scratch, Dust, Curves, CurveOut, CurveTwist, CurveCurve, CurveRolling;
uniform vec2 resolution;
uniform float time;
varying vec2 vUV;
varying vec3 vNormal, vView;

void displace (inout vec3 p, float y) {
	p.xz *= rot(y);
	p.yz *= rot(y);
	vec3 dir = normalize(p);
	p += dir * CurveOut.y * sin(y*2.) * 4.;
	p.x += 1.*CurveTwist.y;
	p.xz *= rot((p.y+p.z) * CurveTwist.y * .5+CurveRolling.y);
	p.xy *= rot((p.x+p.z) * CurveTwist.y * 1.+CurveRolling.y);
	p.x -= 1.*CurveTwist.y;
}

void main () {

	float salt = random(quantity.xx);
	float size = .02 * Curves.y;

	float y = sin(time + anchor.y);
	float fade = y*.5+.5;
	vec3 pos = normalize(position);//mix(vec3(0), position, fade);
	// vec3 forward = normalize(cameraPos - pos);
	// vec3 right = normalize(cross(forward, vec3(0,1,0)));
	// vec3 up = normalize(cross(right, forward));

	vec3 next = pos;

	y = anchor.y + time * 4. + quantity.x;
	displace(pos, y);

	y = anchor.y + time * 4. + quantity.x + .01;
	displace(next, y);

	vec3 up = normalize(pos);
	vec3 forward = normalize(next-pos);
	vec3 right = normalize(cross(up, forward));

	pos += (anchor.x * right + anchor.y * forward) * size;

	vView = cameraPos - pos;
	vUV = anchor;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
