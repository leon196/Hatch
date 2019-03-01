
uniform sampler2D framebuffer;
uniform vec3 cameraPos, cameraTarget;
uniform vec2 resolution;
uniform float time;

float iso (vec3 p, float r) { return dot(p, normalize(sign(p)))-r; }
float opSmoothSubtraction( float d1, float d2, float k ) {
    float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
    return mix( d2, -d1, h ) + k*h*(1.0-h); }
float opSmoothIntersection( float d1, float d2, float k ) {
    float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) + k*h*(1.0-h); }
void moda(inout vec2 p, float repetitions) {
	float angle = 2.*PI/repetitions;
	float a = atan(p.y, p.x) + angle/2.;
	a = mod(a,angle) - angle/2.;
	p = vec2(cos(a), sin(a))*length(p);
}

float fbm (vec3 p) {
  float amplitude = .5;
  float result = 0.0;
  for (float index = 0.0; index <= 3.0; ++index) {
    result += noise(p / amplitude) * amplitude;
    amplitude /= 2.;
  }
  return result;
}


float map (vec3 pos) {
  float scene = 10.0;
  vec3 p = pos;
  vec3 seed = pos;
  float dist = length(pos);
  float spicy = fbm(seed);
  float r = 1.0;// + spicy * .2;
  const float count = 6.0;
  for (float index = count; index > 0.0; --index)
  {
    float w = .8*r;
    float b = 0.4*r;
    p.xz *= rot(.5/r);
    p.yz *= rot(2./r);
    p = abs(p)-w;
    // float wave = 0.5 + 0.5 * sin(time + p.z * 4. / r);
    float s = 0.002;//(.01+wave*.1)*r;
    // p = abs(p)-w/2.;
    scene = smoothmin(scene, length(p.xy)-s, b);
    r /= 2.0;
  }

  // pos = repeat(pos, 2.5);

  // scene = min(scene, box(pos, vec3(0.5)));

  return scene;
}

vec3 getNormal (vec3 pos) {
  vec2 e = vec2(.001,0);
  return normalize(vec3(map(pos+e.xyy)-map(pos-e.xyy), map(pos+e.yxy)-map(pos-e.yxy), map(pos+e.yyx)-map(pos-e.yyx)));
}

vec4 raymarch (vec3 eye, vec3 ray) {
  float dither = random(ray.xy);//+fract(time));
	vec4 result = vec4(eye, 0);
	float total = 0.0;
  float maxt = 20.0;
  const float count = 40.;
  for (float index = count; index > 0.0; --index) {
    result.xyz = eye + ray * total;
    float dist = map(result.xyz);
    if (dist < 0.001 + total * .002 || total > maxt) {
      result.w = index / count;
      break;
    }
    dist *= 0.5 + 0.1 * dither;
    total += dist;
  }
  result.w *= step(total, maxt);
	return result;
}

void main () {
  vec2 uv = (gl_FragCoord.xy-0.5*resolution.xy)/resolution.y;
  vec3 eye = cameraPos;
  vec3 at = cameraTarget;
  vec3 ray = look(eye, at, uv);
  vec3 eyeoffset = 0.02*normalize(cross(normalize(at-eye), vec3(0,1,0)));

  vec4 resultLeft = raymarch(eye-eyeoffset, ray);
  vec4 resultRight = raymarch(eye+eyeoffset, ray);

  vec3 color = vec3(0);
  color.r += resultLeft.w;
  color.gb += resultRight.w;

  // vec3 normal = getNormal(resultLeft);
  // color += vec3(0.752, 0.949, 0.831) * pow(clamp(dot(normal, normalize(vec3(0,-3,1))), 0.0, 1.0), 4.);
  // color += vec3(0.921, 0.905, 0.658) * pow(clamp(dot(normal, normalize(vec3(-1,3,3))), 0.0, 1.0), 4.);
  // color += vec3(0.972, 0.556, 0.329) * clamp(dot(ray, normalize(pos))*.5+.5, 0.0, 1.0);

  // color *= pow(shade, 1.0/4.5);
  // color *= step(length(eye-resultLeft.xyz), maxt);

  gl_FragColor = texture2D(framebuffer, gl_FragCoord.xy/resolution)*.9 + .1*vec4(color, 1);
  // gl_FragColor.rgb = color;
  // gl_FragColor.w = total;// * step(0.001, length(color));
}
