
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
	sceneedge: null,
	scenerender: null,
	controls: null,
	framebuffer: null,
	frametarget: null,
	framebloom: null,
	frameedge: null,
	anaglyph: null,
	bloom: null,
}

export function initEngine () {

	engine.camera.position.x = 0.02;
	engine.camera.position.y = -0.05;
	engine.camera.position.z = 2.0;
	// engine.controls = new OrbitControls(engine.camera, renderer.domElement);
	// engine.controls.enableDamping = true;
	// engine.controls.dampingFactor = 0.1;
	// engine.controls.rotateSpeed = 0.1;

	initUniforms();

	engine.scene = new THREE.Scene();
	Geometry.create(Geometry.random(1000), [6, 6]).forEach(geometry =>
		engine.scene.add(new THREE.Mesh(geometry, assets.shaders.dust)));
	Geometry.create(Geometry.random(10), [1, 200]).forEach(geometry =>
		engine.scene.add(new THREE.Mesh(geometry, assets.shaders.curves)));
	Geometry.createLine(assets.geometries.geo, [1,10]).forEach(geometry =>
		engine.scene.add(new THREE.Mesh(geometry, assets.shaders.eggcrack)));
	engine.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1,1), assets.shaders.text))
	engine.scene.add(new THREE.Mesh(assets.geometries.geo, assets.shaders.egg))


	// engine.framebuffer = new FrameBuffer({ material: assets.shaders.raymarching });
	engine.frametarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
		format: THREE.RGBAFormat,
		type: THREE.FloatType});
	engine.framebloom = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
		format: THREE.RGBAFormat,
		type: THREE.FloatType});
	engine.frameedge = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
		format: THREE.RGBAFormat,
		type: THREE.FloatType});
	engine.bloom = new Bloom(engine.frameedge.texture);

	engine.sceneedge = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), assets.shaders.edge);
	engine.sceneedge.frustumCulled = false;
	engine.scenerender = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), assets.shaders.render);
	engine.scenerender.frustumCulled = false;

	uniforms.frametarget = {value: engine.frametarget.texture};
	uniforms.frameedge = {value: engine.frameedge.texture};
	uniforms.framebloom = {value: engine.framebloom.texture};
	uniforms.blur = {value: engine.bloom.blurTarget.texture};
	uniforms.bloom = {value: engine.bloom.bloomTarget.texture};

	uniforms.textTexture = { value: makeText.createTexture([{
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
		offsetY: 10,
	}]) };
	uniforms.creditTexture = { value: makeText.createTexture([{
		text: 'PONK\n50D\nKOLTES',
		font: 'bebasneue_bold',
		textAlign: 'center',
		fontSize: 196,
		fillStyle: 'white',
		textBaseline: 'middle',
		width: 1024,
		height: 1024,
		shadowColor: 'rgba(0,0,0,.5)',
		shadowBlur: 4,
		offsetY: 20,
	}]) };
	uniforms.jobsTexture = { value: makeText.createTexture([{
		text: 'VISUAL\nMUSIC\nTOOL',
		font: 'bebasneue_bold',
		textAlign: 'center',
		fontSize: 196,
		fillStyle: 'white',
		textBaseline: 'middle',
		width: 1024,
		height: 1024,
		shadowColor: 'rgba(0,0,0,.5)',
		shadowBlur: 4,
		offsetY: 20,
	}]) };
	uniforms.cookieTexture = { value: makeText.createTexture([{
		text: 'Cookie',
		font: 'bebasneue_bold',
		textAlign: 'center',
		fontSize: 300,
		fillStyle: 'white',
		textAlign: 'center',
		textBaseline: 'middle',
		width: 1024,
		height: 1024,
		shadowColor: 'rgba(0,0,0,.5)',
		shadowBlur: 4,
		offsetY: -40,
	},{
		text: 'Collective',
		fontSize: 180,
		offsetY: 130,
	}]) };
	Object.keys(assets.shaders).forEach(key => assets.shaders[key].uniforms = uniforms);
	// gui.add(engine, 'screenshot');
	timeline.start();
}

var array = [0,0,0];

export function updateEngine (elapsed) {
	elapsed = timeline.getTime();
	// engine.controls.update();
	updateUniforms(elapsed);

	// engine.framebuffer.update();
	// uniforms.framebuffer.value = engine.framebuffer.getTexture();

	// record(scene, camera);

	renderer.clear();
	renderer.setRenderTarget(engine.frametarget);
	renderer.render(engine.scene, engine.camera);
	renderer.setRenderTarget(engine.frameedge);
	renderer.render(engine.sceneedge, engine.camera);
	// engine.anaglyph.render(engine.scene, engine.camera);
	renderer.setRenderTarget(null);
	engine.bloom.render(renderer);
	renderer.render(engine.scenerender, engine.camera);

	// array = lerpArray(array, assets.animations.getPosition('Camera', elapsed), .9);
	array = assets.animations.getPosition('Camera', elapsed);
	engine.camera.position.set(array[0], array[1], array[2]);

	engine.camera.fov = 60 + assets.animations.getPosition('ExtraFOV', elapsed)[1];
	engine.camera.updateProjectionMatrix();

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
	engine.framebloom.setSize(width, height);
	engine.frameedge.setSize(width, height);
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
