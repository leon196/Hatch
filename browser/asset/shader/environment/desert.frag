
uniform float time;
uniform sampler2D textureSatelitte, textureCloud;
uniform vec3 sun, panel, warningLight, dangerLight;
varying vec3 vColor, vNormal, vView, vWorld;
varying vec2 vUv, vScreen;

// chunk(common);
// chunk(packing);
// chunk(bsdfs);
// chunk(lights_pars_begin);
// chunk(shadowmap_pars_fragment);
// chunk(shadowmask_pars_fragment);

void main () {
	vec3 normal = normalize(vNormal);
	vec3 view = normalize(vView);
	vec3 lightDir = normalize(sun);
	// float shade = dot(normal, view)*2.+1.5;
	float shade = dot(normal, lightDir)*.2+.8;
	// shade *= dot(normal, view)*.5+.5;
	float fade = 1.-length(vUv*2.-1.);
	fade = smoothstep(.0, .5, fade);
	// float salt = noise(vWorld * 100.);
	float salt = random(vWorld.xz * 100.);
	float dust = abs(sin(vWorld.y*100.+time*.2+vNormal.y*10.));
	vec3 color = colorDesert;
	vec3 c = vec3(0.968, 0.909, 0.768);
	// color = mix(color, c, abs(dot(normal, vec3(0,0,1))));
	// color = mix(color, c, abs(dot(normal, vec3(1,0,0))));
	// color *= .5;
	// chunk(lightmap_fragment);

	float light = getSunLight(sun);

	color *= mix(1., shade, fade);
	color = mix(colorSkyNight * luminance(color) * .5, color, light);
	// color = mix(colorDesert * light, color, fade);
	// color = mix(color, c, smoothstep(.0, 1., .5/dust)*.05);
	color += smoothstep(.5,1.,salt)*.1*fade;
	color = clamp(color, 0., 1.);
  color *= mix(1., .5+.5*getShadowMask(), smoothstep(.4, 1., light));
	color *= mix(1., 0., clamp(dot(-lightDir, normal), 0., 1.));

  // light from panel
  vec3 worldPanel = vWorld - panel * .999;
  vec3 dir = -panel;
  float d = length(worldPanel);
  fade = smoothstep(.25, .5, d) * smoothstep(1.5, 0., d);
	float waveWarning = warningLight.y;
	float waveDanger = dangerLight.y;
	float diffAngle = abs(atan(worldPanel.z, worldPanel.x) - atan(panel.z, panel.x));
	float lightFade = (1.-light) * smoothstep(.6, .0, diffAngle) * .5;
  color += colorWarningLight * waveWarning * fade * lightFade;
  color += colorDangerLight * waveDanger * fade * lightFade;

  // road
  // diffAngle = abs(atan(vWorld.z, vWorld.x) - atan(panel.z, panel.x));
  // color = mix(color, vec3(1) * light, smoothstep(.008, .002, diffAngle));

  // cloud shadow
  // float noisy = fbm(vWorld.xz * .2);
  // color *= .5+.5*texture2D(textureCloud, vUv).a;

	gl_FragColor = vec4(color, 1);
}