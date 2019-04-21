
varying vec2 vUV;
varying vec3 vNormal, vView;

void main () {
	vec3 color = abs(vNormal);
	// float lod = 4.;
	// color = floor(color*lod)/lod;
	color = vec3(luminance(color));
	
	gl_FragColor = clamp(vec4(color,1), 0., 1.);
}
