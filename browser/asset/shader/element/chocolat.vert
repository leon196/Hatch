
attribute vec2 quantity;
attribute vec3 color;
uniform float time;
uniform vec3 cameraPos;
varying vec3 vColor, vNormal, vView;
varying vec2 vUv;

float fbm (vec2 p) {
    float value = 0.0;
    float amplitud = .5;
    for (float i = 3.; i >= 1.; --i) {
        value += amplitud * noise(p);
        p *= 2.;
        amplitud *= .5;
    }
    return value;
}

void main () {
	float salt = random(quantity.xx*100.);
	float pepper = random(quantity.xx*10.+vec2(.123124,.5243));
	float curry = random(quantity.xx*20.+vec2(.87354,.1657));
	// float slide = mod(quantity.x + time * .02, 1.) * 2. - 1.;
	float size = (.1+.9*(.5+.5*sin(salt * TAU + time)))*1.5;
	vec3 pos = position * size;
	vNormal = normal;

	float a1 = salt*TAU + time * (1.+salt);
	float a2 = pepper*TAU + time * .1;

	pos.xz *= rotation(a1);
	pos.yz *= rotation(a2);
	vNormal.xz *= rotation(a1);
	vNormal.yz *= rotation(a2);

	float a3 = quantity.x * TAU + time * (.01+.2*salt);
	pos.xz += vec2(cos(a3), sin(a3)) * (6.+7.*quantity.x);
	pos.y += 3. + sin(salt*10.+time * (.1+.5*pepper)) * 3.;
	// pos.z += slide * 10.;


	/*
	// pos.z += quantity.y;
	float angle = quantity.x * 32.6246;
	float radius = quantity.x * 4.;
	vec2 offset = vec2(cos(angle),sin(angle)) * radius;
	pos.xz += offset;
	float noisy = fbm(offset*.5);
	noisy = abs(noisy*2.-1.);
	vec2 p = offset/5.;
	float fade = abs(p.x)*abs(p.y);
	pos.y += noisy*size-fade;
	*/
	vView = cameraPos - pos;
	vColor = color;
	vUv = uv;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1);
}