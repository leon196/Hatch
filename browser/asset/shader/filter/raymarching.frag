
uniform vec3 cameraPos, cameraTarget;
uniform vec2 resolution;
uniform float time, blend, range, radius, height, thin, count;
uniform float kaleidoX, kaleidoY, kaleidoZ;
uniform float rotation1, rotation2, rotation3, rotation4, rotation5, rotation6;

// Geometry
// float range = .8;
// float radius = .4;
// float height = .001;
// float thin = .5;
// float blend = .01;
// const float count = 12.;

// Light
vec3 lightPos = vec3(1, 2, 1) * 8.;
float specularSharpness = 10.;
float glowSharpness = 1.;

// Colors
vec3 ambient = vec3(.0);
vec3 light = vec3(1);
vec3 specular = vec3(.1);
vec3 glow = vec3(.5);

// Raymarching
const float epsilon = .001;
const float steps = 100.;
const float far = 100.;

float geometry (vec3 pos)
{
	float scene, shape, h, r, rr, b, c, hole, crop;
	scene = shape = hole = crop = 10.;
	// pos /= .34*sqrt(dot(pos*pos,pos*pos));
	vec3 p = pos;
	vec3 pp;
	vec2 tt, e;
	c = ceil(count);
	float wave1 = sin(-time+length(pos));
	// p = repeat(p, 1.);
	// shape = box(p, vec3(radius));
	// shape = min(sdist(p.yz, radius), sdist(p.xz, radius));
	for (float index = 20.; index > 0.; --index) {
		if (20. - index > c) break;
		float ratio = (index - (20.-c)) / c;
		
		// easing
		ratio *= ratio;
		float iratio = 1.-ratio;
		
		pp = abs(p) - range * ratio;
		p.x = mix(p.x, pp.x, kaleidoX);
		p.y = mix(p.y, pp.y, kaleidoY);
		p.z = mix(p.z, pp.z, kaleidoZ);
		// p.xz = abs(p.xz) - range * ratio;
		
		p.xy *= rot(rotation3*ratio+rotation6);
		p.xz *= rot(rotation1*ratio+rotation4);
		p.yz *= rot(rotation2*ratio+rotation5);

		r = radius * ratio;
		// rr = r * (1.-thin);
		h = height * ratio;
		b = blend * ratio;
		tt = vec2(r,thin*ratio);
		// shape = smoothmin(shape, smoothmin(torus(p, tt), smoothmin(torus(p.xzy, tt), torus(p.zxy, tt), b/3.), b/3.), b/3.);
		// shape = smoothmin(shape, sdist(p, r), b);
		// shape = smoothmin(shape, sdist(p.xz, r), b);
		// shape = smoothmin(shape, box(p, vec3(r)), b);
		// shape = smoothmin(shape, max(abs(p.x) - r, abs(p.y) - h), b);
		shape = smoothmin(shape, max(max(p.x, p.y), p.z), b);
		// shape = smoothmin(shape, max(p.x, p.y), b);
		// shape = smoothmin(shape, p.x, b);
	}
	shape = max(-shape, 0.);
	return max(shape, -sdist(pos-cameraPos, 1.));
}

vec3 getNormal (vec3 p) {
	vec2 e = vec2(epsilon,0);
	return normalize(vec3(geometry(p+e.xyy)-geometry(p-e.xyy), geometry(p+e.yxy)-geometry(p-e.yxy), geometry(p+e.yyx)-geometry(p-e.yyx)));
}

float getShadow (vec3 pos, vec3 at, float k) {
    vec3 dir = normalize(at - pos);
    float maxt = length(at - pos);
    float f = 1.;
    float t = epsilon*10.;
    for (int i = 50; i > 0; --i) {
        float dist = geometry(pos + dir * t);
        if (dist < epsilon) return 0.;
        f = min(f, k * dist / t);
        t += dist;
        if (t >= maxt) break;
    }
    return f;
}

void raymarching (vec3 pos, vec3 ray, inout vec4 hit)
{
	float total = 0.;
	float dither = random(ray.xz);
	for (float i = steps; i >= 0.; --i) {
		float dist = geometry(pos);
		hit.xyz = pos;
		if (dist < epsilon * total) {
			hit.w = i/steps;
			break;
		}
		if (total > far) {
			hit.w = 0.;
			break;
		}
		dist *= .5 + .1 * dither;
		total += dist;
		pos += ray * dist;
	}
}

void main ()
{    
	vec2 uv = (gl_FragCoord.xy-.5*resolution.xy)/resolution.y;
	vec4 hit;

	// lightPos.xz *= rot(time);

	vec3 ray = look(cameraPos, cameraTarget, uv);
	raymarching(cameraPos, ray, hit);

	vec3 pos = hit.xyz;
	vec3 normal = getNormal(pos);
	vec3 lightDir = normalize(lightPos);
	float lightIntensity = clamp(dot(lightDir, normal),0.,1.);
	float specularIntensity = saturate(pow(max(0., dot(reflect(lightDir, normal), ray)), specularSharpness));
	float glowIntensity = saturate(pow(abs(1.-abs(dot(normal, ray))), glowSharpness));

	gl_FragColor = vec4(1);
	gl_FragColor.rgb = ambient + light * lightIntensity + specular * specularIntensity + glow * glowIntensity;
	gl_FragColor.rgb *= .4 + .6 * getShadow(pos, lightPos, 40.);
	// gl_FragColor.rgb = normal * .5 + .5;
	gl_FragColor.rgb *= pow(hit.w, 1./2.2) * .6;
}