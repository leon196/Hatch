
uniform sampler2D frame, frameUI, curve, bloom, blur;
uniform vec2 resolution, mouse;
uniform float time;
uniform vec3 fade, sun, timeElapsed;
varying vec2 vUv;

float fbm (vec2 seed) {
	float value = 0.;
	float amplitude = .5;
	const int count = 4;
	for (int i = 0; i < count; ++i) {
		value += amplitude * noise(seed);
		amplitude *= .5;
		seed *= 2.;
		seed.x += timeElapsed.y * .1;
		seed *= rotation(-timeElapsed.y * .01);
	}
	return value;
}

void main () {
	vec4 color = vec4(1);
	vec2 p = vUv * 2. - 1.;
	float fade = smoothstep(.0, .5, 1.-abs(p.x)) * smoothstep(.0, .5, 1.-abs(p.y));
	float noisy = fbm(vUv * 4.);
	noisy = sqrt(noisy);
	noisy = smoothstep(.7, .8, noisy);
	noisy = sin(noisy*PI);
	// noisy *= noisy;
	color.a *= noisy * fade;// * .75;
	color.a *= .8 + .2 * getSunLight(sun);

	gl_FragColor = color;
}