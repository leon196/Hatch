
uniform float timeLoop;
varying vec2 vAnchor, vQuantity, vScreen;

void main () {
	vec2 p = vAnchor;
	float ratio = vQuantity.x;
	// ratio *= ratio;
	ratio = 1.- ratio;
	float thin = .05;
	// float width = .9;
	// float fade = (1.-abs(p.x))*(1.-abs(p.y));
	// float shade = fade * thin / abs(abs(p.y)-width) / abs(abs(p.x)-width);
	float x = abs(p.x) * .5 - floor(ratio * 100.) * .01;
	float y = abs(p.y + .01 / -abs(sin(abs(sin(x * 1000.) * sin(x * 400.) * sin(x * 100.) * sin(x * 10.)))*PI));
	float shade = (1.-y) * thin / y;
	gl_FragColor = vec4(1,1,1,shade);
}