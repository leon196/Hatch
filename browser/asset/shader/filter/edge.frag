

uniform sampler2D frametarget;
uniform vec2 resolution, mouse;
uniform float time;
varying vec2 vUv;

void main () {
	vec4 color = edgeSD(frametarget, vUv, resolution);
	gl_FragColor = color;
}
