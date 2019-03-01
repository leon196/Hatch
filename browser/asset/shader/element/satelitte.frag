
uniform sampler2D textureSatelitte;
uniform vec3 sun;
varying vec3 vNormal, vView, vColor;
varying vec2 vUv;

void main () {
	float light = getSunLight(sun);
	vec3 normal = normalize(vNormal);
	vec3 view = normalize(vView);
	vec3 lightDir = normalize(sun);
	float shade = clamp(dot(lightDir, normal)*.5+.5, 0., 1.);
	vec3 color = mix(vec3(1), colorDesert, .5);
	color *= texture2D(textureSatelitte, vUv).rgb;
	color *= light;
	color *= shade;
	color += .5 * colorDesert * pow(max(0., dot(reflect(lightDir, normal), view)), 1.) * light;
	float back = (1.-abs(dot(-view, normal)));
	color += .5 * colorDesert * back * light;
	color += pow(back, 2.) * (1.-light);
	gl_FragColor = vec4(color, 1);
}