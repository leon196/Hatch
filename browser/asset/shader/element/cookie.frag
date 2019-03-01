
uniform vec3 boom;
varying vec3 vColor, vNormal, vView;

void main () {
	// float shade = dot(normalize(vNormal), normalize(vView)) * .5 + .5;
	// float shade = 1.-abs(dot(normalize(vNormal), normalize(vView)));
	// shade = shade * .5 + .5;
	// shade = smoothstep(.0, .5, shade);
	// gl_FragColor = vec4(luminance(vColor) * vec3(0.984, 0.690, 0.137) * 1.5,1);
	// gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1), smoothstep(.1, .2, boom.y));
	gl_FragColor = vec4(vec3(mix(luminance(vColor)*2., 1., smoothstep(.1, .2, boom.y))), 1);
}