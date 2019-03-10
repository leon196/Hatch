
varying vec2 vUV;
varying vec3 vNormal, vView;

void main () {
	vec3 color = vec3(1);
	float depth = length(vView);
	// color *= 1.0-abs(vUV.x);
	// vec3 normal = normalize(vNormal);
	// vec3 view = normalize(vView);
	// color = normal * 0.5 + 0.5;
	// color = hsv2rgb(vec3(rgb2hsv(color).x * 0.3 + 0.5, 0.75, 1.0));
	// color *= dot(normal, -view) * 0.5 + 0.5;
	// color += 0.5 * (dot(normalize(vNormal), normalize(vec3(0,-1,0))) * 0.5 + 0.5);
	// color += 0.5 * (dot(normalize(vNormal), normalize(vec3(1,1,0))) * 0.5 + 0.5);
	// color = smoothstep(.4, .5, color);
	// color.rgb *= smoothstep(4.0, 0.5, depth);
	float thin = 0.025;
	float x = abs(vUV.x);
	float alpha = (1.0-x)*thin/x;
	gl_FragColor = vec4(color, alpha);
}