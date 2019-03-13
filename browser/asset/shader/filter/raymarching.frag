
uniform sampler2D framebuffer;
uniform vec3 cameraPos, cameraTarget;
uniform vec2 resolution;
uniform float time;
uniform float count, range, radius, height, thin, blend, rotationX, rotationY, rotationZ, amplitude, spice, raydamping, framedamping, eyeoffset;

float fbm (vec3 p) {
  float amplitude = .5;
  float result = 0.0;
  for (float index = 0.0; index <= 5.0; ++index) {
    result += noise(p / amplitude) * amplitude;
    amplitude /= 2.;
  }
  return result;
}

float map (vec3 pos) {
  float scene = 10.0;
  float dist = length(pos);
  vec3 seed = pos * 2.;
  vec3 p = pos;
  float spicy = fbm(seed + noise(seed));
  float r = 1.0 + spicy * spice;
  for (float index = 2.0; index > 0.0; --index) {
    float w = range*r;
    float b = blend*r;
    p.xz *= rot(rotationY/r);
    p.yz *= rot(rotationX/r);
    p.yx *= rot(rotationZ/r);
    p = abs(p)-w;
    float s = thin * r;
    scene = smoothmin(scene, sdCylinderSquare(p.xz, s), b);
    r /= amplitude;
  }
  return scene;
}

vec3 getNormal (vec3 pos) {
  vec2 e = vec2(.001,0);
  return normalize(vec3(map(pos+e.xyy)-map(pos-e.xyy), map(pos+e.yxy)-map(pos-e.yxy), map(pos+e.yyx)-map(pos-e.yyx)));
}

vec4 raymarch (vec3 eye, vec3 ray) {
  float dither = random(ray.xy+fract(time));
  vec4 result = vec4(eye, 0);
  float total = 0.0;
  float maxt = 20.0;
  const float raycount = 40.;
  for (float index = raycount; index > 0.0; --index) {
    result.xyz = eye + ray * total;
    float dist = map(result.xyz);
    if (dist < 0.00001 + total * .0001 || total > maxt) {
      result.w = index / raycount;
      break;
    }
    dist *= raydamping + 0.1 * dither;
    total += dist;
  }
  result.w *= step(total, maxt);
  return result;
}
/*
float volumetric (vec3 eye, vec3 ray) {
  vec3 pos = eye;
  vec3 light = vec3(-4,1,0);
  const float count = 5.0;
  float max = 10.0;
  float march = max / count;
  for (float index = count; index > 0.0; --index) {
    float dist = map(pos);
    // if (dist >)
  }
}
*/
void main () {
  vec2 uv = (gl_FragCoord.xy-0.5*resolution.xy)/resolution.y;
  vec3 eye = cameraPos;
  vec3 at = cameraTarget;
  vec3 ray = look(eye, at, uv);
  vec4 result = raymarch(eye, ray);
  vec3 color = vec3(1);
  color *= result.w;
  gl_FragColor = texture2D(framebuffer, gl_FragCoord.xy/resolution)*framedamping + (1.-framedamping)*vec4(color, 1);
  // gl_FragColor.rgb = color;
}
