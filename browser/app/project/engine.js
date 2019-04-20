
import * as THREE from 'three.js';
import * as timeline from '../engine/timeline';
import * as makeText from '../engine/make-text';
import renderer from '../engine/renderer';
import FrameBuffer from '../engine/framebuffer';
import parameters from '../engine/parameters';
import Geometry from '../engine/geometry';
import assets from '../engine/assets';
import Bloom from '../libs/bloom/bloom';
import { AnaglyphEffect } from '../libs/AnaglyphEffect';
import { gui } from '../engine/gui';
import { OrbitControls } from '../libs/OrbitControls';
import { uniforms, initUniforms, updateUniforms, resizeUniforms } from './uniform';
import { clamp, lerp, lerpArray, lerpVector, lerpArray2, lerpVectorArray, saturate } from '../engine/misc';

export var engine = {
	camera: new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 1000),
	target: new THREE.Vector3(),
	scene: null,
	controls: null,
	framebuffer: null,
	frametarget: null,
	framerender: null,
	anaglyph: null,
	bloom: null,
}

export function initEngine () {

	engine.camera.position.x = 0.02;
	engine.camera.position.y = -0.05;
	engine.camera.position.z = 2.0;
	engine.controls = new OrbitControls(engine.camera, renderer.domElement);
	engine.controls.enableDamping = true;
	engine.controls.dampingFactor = 0.1;
	engine.controls.rotateSpeed = 0.1;

	initUniforms();

	engine.scene = new THREE.Scene();
	Geometry.create(Geometry.random(1000), [3, 3]).forEach(geometry =>
		engine.scene.add(new THREE.Mesh(geometry, assets.shaders.sprites)));
	Geometry.create(Geometry.random(10), [1, 100]).forEach(geometry =>
		engine.scene.add(new THREE.Mesh(geometry, assets.shaders.curves)));
	// Geometry.createLine(assets.geometries.geo).forEach(geometry =>
	// 	engine.scene.add(new THREE.Mesh(geometry, assets.shaders.geo)));
	// engine.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1,1), assets.shaders.text))
	engine.scene.add(new THREE.Mesh(assets.geometries.geo, assets.shaders.geo2))

	// engine.framebuffer = new FrameBuffer({ material: assets.shaders.raymarching });
	engine.frametarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
		format: THREE.RGBAFormat,
		type: THREE.FloatType});
	engine.bloom = new Bloom(engine.frametarget.texture);

	engine.framerender = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), assets.shaders.render);
	engine.framerender.frustumCulled = false;

	Object.keys(assets.shaders).forEach(key => assets.shaders[key].uniforms = uniforms);
	uniforms.frametarget.value = engine.frametarget.texture;
	uniforms.blur.value = engine.bloom.blurTarget.texture;
	uniforms.bloom.value = engine.bloom.bloomTarget.texture;



	var words = [
		{
			text: 'HATCH',
			font: 'kanit',
			textAlign: 'center',
			fontSize: 196,
			fillStyle: 'white',
			textAlign: 'center',
			textBaseline: 'middle',
			width: 1024,
			height: 1024,
			shadowColor: 'rgba(0,0,0,.5)',
			shadowBlur: 4,
		}
	];
	uniforms.textTexture = { value: makeText.createTexture(words) };

	// engine.anaglyph = new AnaglyphEffect(renderer, window.innerWidth, window.innerHeight);

	gui.add(engine, 'screenshot');
}

var array = [0,0,0];

export function updateEngine (elapsed)
{
	elapsed = timeline.getTime();
	// engine.controls.update();
	updateUniforms(elapsed);

	// engine.framebuffer.update();
	// uniforms.framebuffer.value = engine.framebuffer.getTexture();

	// record(scene, camera);

	renderer.clear();
	renderer.setRenderTarget(engine.frametarget);
	renderer.render(engine.scene, engine.camera);
	// engine.anaglyph.render(engine.scene, engine.camera);
	renderer.setRenderTarget(null);
	engine.bloom.render(renderer);
	renderer.render(engine.framerender, engine.camera);

	// array = lerpArray(array, assets.animations.getPosition('Camera', elapsed), .9);
	array = assets.animations.getPosition('Camera', elapsed);
	engine.camera.position.set(array[0], array[1], array[2]);

	// array = lerpArray(array, assets.animations.getPosition('CameraTarget', elapsed), .9);
	array = assets.animations.getPosition('CameraTarget', elapsed);
	engine.target.set(array[0], array[1], array[2]);
	engine.camera.lookAt(engine.target);
}

export function resizeEngine (width, height)
{
	renderer.setSize(width, height);
	// engine.framebuffer.setSize(width,height);
	engine.camera.aspect = width/height;
	engine.camera.updateProjectionMatrix();
	engine.frametarget.setSize(width, height);
	// engine.anaglyph.setSize(width, height);
	resizeUniforms(width, height);
}

engine.screenshot = function () {

	var w = parameters.debug.renderwidth;
	var h = parameters.debug.renderheight;
	resizeEngine(w, h);

	setTimeout(function(){

    var arr = renderer.domElement.toDataURL().split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    var blob = new Blob([u8arr], {type:mime});
    var a = document.createElement("a"), url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "render.png";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);

		resizeEngine(window.innerWidth, window.innerHeight);

	}, 1000 * parameters.debug.renderdelay);
}
