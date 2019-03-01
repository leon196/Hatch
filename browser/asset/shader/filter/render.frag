
uniform sampler2D framebuffer;
uniform vec2 resolution, mouse;
uniform float time;
varying vec2 vUv;

void main () {
	// vec2 p = vUv;
	// p = vUv * 2. - 1.;
	// p.x *= uResolution.x/uResolution.y;
	vec4 color = texture2D(framebuffer, vUv);
	float depth = color.a;
	vec2 offset = vec2(smoothstep(-10.0, 10., depth),0);
	offset *= 0.01;
	color.r = texture2D(framebuffer, vUv+offset).r;
	color.gb = texture2D(framebuffer, vUv-offset).gb;
	color.a = 1.0;

	// vec4 color = vec4(vUv, 0.5+0.5*sin(time), 1);
	gl_FragColor = vec4(color.rgb, 1);
  // gl_FragColor = texture2D(framebuffer, gl_FragCoord.xy/resolution)*.9 +.1*color;
}