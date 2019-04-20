
varying vec2 vUV;
varying vec3 vNormal, vView;

void main () {
	vec3 color = abs(vNormal);
	// float lod = 4.;
	// color = floor(color*lod)/lod;
	
	gl_FragColor = vec4(color,1);
}
