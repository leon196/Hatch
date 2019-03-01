
uniform vec3 sun;
varying vec3 vNormal, vView;
varying vec2 vAnchor;

// chunk(common);
// chunk(packing);
// chunk(bsdfs);
// chunk(lights_pars_begin);
// chunk(shadowmap_pars_fragment);
// chunk(shadowmask_pars_fragment);

void main () {
	float light = getSunLight(sun);
	vec3 normal = normalize(vNormal);
	float shade = clamp(dot(normalize(sun), normal)*.5+.5, 0., 1.);
	vec3 color = mix(vec3(.5), colorDesert, .2);
	color *= light;
	color *= shade;
  color *= mix(1., .5+.5*getShadowMask(), smoothstep(.4, 1., light));
	gl_FragColor = vec4(color,1);
}