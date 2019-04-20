
attribute vec2 anchor, quantity;
attribute vec3 color, next;
uniform vec3 cameraPos, cameraTarget, Geo, EggBreak, Crack, Cracking, Scratching, CurveTwist;
uniform vec2 resolution;
uniform float time;
varying vec2 vUV;
varying vec3 vNormal, vView;

void main () {

	vec3 pos = position * Geo.y;
	float l = mod(time, 1.);
	float fade = smoothstep(1., .5, length(pos-Crack));
	fade = mix(fade, 1., CurveTwist.y);
	// pos += normal * random(pos.xy) * fade;
	// pos.y += sin(l*PI) * fade * .2;
	// pos.xz += normal.xz * l * fade;
	float salt = random(pos.xy);
	float curry = random(normal.xy);
	pos.xyz += normal * salt * fade * .1 * Scratching.y;
	fade = smoothstep(-.5, 0., pos.y);
	fade = mix(fade, 1., CurveTwist.y);
	pos.xyz += normal * (Cracking.y+curry*Cracking.y) * fade;
	// pos.y = mix(pos.y, -1., (1.-sin(Cracking.y * PI + curry))*Cracking.y * fade);
	vView = cameraPos - pos;
	vUV = anchor;
	vNormal = normal;

	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}
