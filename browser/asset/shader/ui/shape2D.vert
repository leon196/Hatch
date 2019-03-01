
uniform vec2 resolution;
uniform vec4 rect;
uniform vec2 anchor, offset;
varying vec2 vUv;

void main () {
	vUv = uv;
	vec2 p = uv*2.-1.;
	p -= anchor;
	p.x *= resolution.y/resolution.x;
	// vec3 pos = (modelMatrix * vec4(p, 0, 1)).xyz;
	vec2 pos = p * rect.zw + rect.xy + 2. * offset / resolution;
	gl_Position = vec4(pos, 0., 1.);
}