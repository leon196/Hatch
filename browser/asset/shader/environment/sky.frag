
uniform float time;
uniform vec3 sun, moon, timeElapsed, skyColor;

varying vec3 vView, vPos;

void main () {
	vec3 view = normalize(vView);
	float salt = random(vView.xz);
	float horizon = clamp(vPos.y * .004 + .1*salt, 0., 1.);
	float light = getSunLight(sun);

	vec3 v = view;
	v.yz *= rot(PI/2.);
	v.yx *= rotation(-timeElapsed.y * .005);
	v.xz *= rotation(-timeElapsed.y * .005);
	float r = length(v);
	float lon = atan(v.y, v.x) + PI;
	float lat = acos(v.z / r);
	vec2 skyUV = mod(abs(vec2(lon, lat) / vec2(PI, PI)), 1.0);

	vec3 color;
	
	// sky
	color = mix(mix(colorSkyDark, colorSkyNight, horizon),  mix(colorDesert, colorSkyDay, horizon), light);

	color *= skyColor.y;

	// sun
	vec3 dirSun = normalize(cross(normalize(sun), vView));;
	float angle = atan(dirSun.x, dirSun.y);
	float thinSun = .0001+.0001*abs(sin(angle*20.)*sin(angle*5.)*sin(angle*40.));
	float shapeSun = thinSun/(dot(normalize(sun), view)+1.);
	color += vec3(vec2(1.), .5) * shapeSun;

	// moon
	// float dotMoon = dot(normalize(moon), view)+1.;
	// float shapeMoon = .0002/(dotMoon);
	// shapeMoon = smoothstep(.5, 1., shapeMoon);
	// float shapeMoonDay = smoothstep(.0008,.000089,dotMoon) * .02;
	// shapeMoon = mix(shapeMoon, shapeMoonDay, light);
	// color += shapeMoon;

	// star
	const float count = 3.;
	float l = ((1.-light)+(1.-skyColor.y)*2.)*.002;
	for (float index = count; index > 0.; --index) {
		float ratio = index / count;
		ratio *= ratio;
		float cell = 20. * ratio + 10.;
		vec2 uv = skyUV*cell;
		vec2 p = mod(uv, 1.)-.5;
		salt = random(floor(uv)*.001);
		p += .25 * sin(salt*33.);
		float d = length(p);
		color += l*salt*(1.-clamp(d*4.,0.,1.)) / d;
	}

	// ground
	// float ground = clamp(vPos.y, 0., 1.);
	// color = mix(colorDesert * light, color, ground);

	gl_FragColor = vec4(clamp(color, 0., 1.), 1);
	// gl_FragColor.rgb = mix(gl_FragColor.rgb, 1.-gl_FragColor.rgb, skyColor.z);
}