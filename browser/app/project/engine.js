
import * as THREE from 'three.js';
import { OrbitControls } from '../libs/OrbitControls';
import renderer from '../engine/renderer';
import assets from '../engine/assets';
import Bloom from '../libs/bloom/bloom';
import { uniforms } from './uniform';
import { clamp, lerp, lerpArray, lerpVector, lerpArray2, lerpVectorArray, saturate } from '../engine/misc';

export var engine = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 2000),
	target: new THREE.Vector3(),
	controls: null,
	framerender: null,
	frametarget: new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight),
	bloom: null,
	timeLoop: 0,
}

export function initEngine () {

	engine.camera.position.x = 5;
	engine.camera.position.y = 5;
	engine.camera.position.z = 5;

	engine.controls = new OrbitControls(engine.camera, renderer.domElement);
	engine.controls.enableDamping = true;
	engine.controls.dampingFactor = 0.1;
	engine.controls.rotateSpeed = 0.1;
	engine.controls.target.y = 3;

	engine.framerender = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), assets.shaders.render);
	engine.framerender.frustumCulled = false;

	engine.bloom = new Bloom(engine.frametarget.texture);
}

var vector = new THREE.Vector3();
var array = [0,0,0];
var arrayCamera = [0,0,0];
var arrayFOV = [0,0,0];
var arrayTarget = [0,0,0];
var arraySun = [0,0,0];

export function updateEngine (elapsed) {
	engine.controls.update();
	
	// array = assets.animations.getPosition('camera', elapsed);
	// arrayCamera = lerpArray(arrayCamera, array, .1);
	// engine.camera.position.set(arrayCamera[0], arrayCamera[1], arrayCamera[2]);

	// array = assets.animations.getPosition('fov', elapsed);
	// arrayFOV = lerpArray(arrayFOV, array, .1);
	// if (arrayFOV[1] != engine.camera.fov) {
	// 	engine.camera.fov = arrayFOV[1];
	// 	engine.camera.updateProjectionMatrix();
	// }
	
	// array = assets.animations.getPosition('target', elapsed);
	// arrayTarget = lerpArray(arrayTarget, array, .1);
	// engine.target.set(arrayTarget[0], arrayTarget[1], arrayTarget[2]);
	// engine.camera.lookAt(engine.target);
}