
uniform float time;
uniform sampler2D texturePanel;
uniform vec3 sun, panel, led, warningLight, dangerLight;
varying vec3 vNormal, vView, vWorld;
varying vec2 vUv;

void main () {
	float light = getSunLight(sun);
	vec3 normal = normalize(vNormal);
	vec3 view = normalize(vView);
	float shade = clamp(dot(normalize(sun), normal)*.25+.75, 0., 1.);
	vec3 color = texture2D(texturePanel, vUv).rgb;
	color = mix(color, colorSkyNight, .2);
	// color *= light;
	color *= shade;
	vec3 offset = vec3(0,.045,0);
	vec3 pLedRed = vWorld-led-offset;
	pLedRed.x = repeat(pLedRed.x + .015, .031);
	float waveWarning = warningLight.y;
	float waveDanger = dangerLight.y;
	float lightFade = (1.-light);
  color += .5 * colorWarningLight * waveWarning * lightFade * .01/length(vWorld-led);
  color += .75 * colorDangerLight * waveDanger * lightFade * (.01/length(pLedRed) + smoothstep(.15, .0, length(pLedRed)));
	gl_FragColor = vec4(color, 1);
}