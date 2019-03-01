
uniform vec3 sun;
uniform sampler2D textureBush1;
varying vec2 vAnchor;
varying float vBlend;

void main () {
	vec2 uv = vAnchor * .5 + .5;
	vec4 bush = texture2D(textureBush1, uv);
	if (bush.a < .3) discard;
	gl_FragColor = vec4(colorDesert * (.5+.5*bush.rgb), 1);
}