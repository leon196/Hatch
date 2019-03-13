
uniform sampler2D framebuffer, frametarget, bloom, blur;
uniform vec2 resolution, mouse;
uniform float time;
varying vec2 vUv;

float fbm (vec3 p) {
  float amplitude = .5;
  float result = 0.0;
  for (float index = 0.0; index <= 5.0; ++index) {
    result += noise(p / amplitude) * amplitude;
    amplitude /= 2.;
  }
  return result;
}

void main () {
	vec4 color = texture2D(frametarget, vUv);
	vec4 blurry = texture2D(blur, vUv);
	float depth = smoothstep(2.0, 0.0, color.w);
	// depth *= smoothstep(2.0, 1.0, color.w);
	// color = mix(color, blurry, depth);
	// color += blurry * 4.0;
	color *= depth;
	vec2 uv = vUv;
	uv.x *= resolution.x/resolution.y;
	float salty = fbm(uv.xyy * .4 + noise(uv.xyy) * .5);
	float lod = 40.;
	salty = floor(salty*lod)/lod;
	float frequency = 500.;
	// salty = 
	float lines = smoothstep(0.9, 1., abs(mod(salty*frequency, 1.)*2.-1.));
	color = vec4(lines);
	gl_FragColor = vec4(color.rgb, 1);
}