
varying vec3 vNormal, vView;

void main () {
	vec3 color = vec3(1);
	// vec3 normal = normalize(vNormal);
	// color = normal * 0.5 + 0.5;
	// color *= dot(abs(normal), -normalize(vec3(-1,0,0))) * 0.5 + 0.5;
	// color += 0.5 * (dot(normalize(vNormal), normalize(vec3(0,-1,0))) * 0.5 + 0.5);
	// color += 0.5 * (dot(normalize(vNormal), normalize(vec3(1,1,0))) * 0.5 + 0.5);
	// color = smoothstep(.4, .5, color);
	gl_FragColor = vec4(color, 1);
}