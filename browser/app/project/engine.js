
import * as THREE from 'three.js';
import { OrbitControls } from '../libs/OrbitControls';
import renderer from '../engine/renderer';
import FrameBuffer from '../engine/framebuffer';
import parameters from '../engine/parameters';
import assets from '../engine/assets';
import Bloom from '../libs/bloom/bloom';
import { uniforms, initUniforms, updateUniforms, resizeUniforms } from './uniform';
import { clamp, lerp, lerpArray, lerpVector, lerpArray2, lerpVectorArray, saturate } from '../engine/misc';

export var engine = {
	camera: new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 2000),
	target: new THREE.Vector3(),
	screenshot: function(){},
	scene: null,
	controls: null,
	framebuffer: null,
	bloom: null,
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function download(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(blob, filename);
  else { // Others
    var a = document.createElement("a"), url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
  }
}

export function initEngine () {

	engine.camera.position.x = -1;
	engine.camera.position.y = 1;
	engine.camera.position.z = 3;

	engine.controls = new OrbitControls(engine.camera, renderer.domElement);
	engine.controls.enableDamping = true;
	engine.controls.dampingFactor = 0.1;
	engine.controls.rotateSpeed = 0.1;

	assets.shaders.raymarching.uniforms = uniforms;
	assets.shaders.render.uniforms = uniforms;

	engine.scene = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), assets.shaders.render);
	engine.scene.frustumCulled = false;

	engine.framebuffer = new FrameBuffer({
		material: assets.shaders.raymarching
	});

	engine.screenshot = function () {

		var w = parameters.debug.renderwidth;
		var h = parameters.debug.renderheight;
		renderer.setSize(w, h);
		engine.framebuffer.setSize(w,h);
		engine.camera.aspect = w/h;
		engine.camera.updateProjectionMatrix();
		resizeUniforms(w, h);

		setTimeout(function(){

	 		download(dataURLtoBlob(renderer.domElement.toDataURL()), "render.png");

			var w = window.innerWidth / renderer.scale;
			var h = window.innerHeight / renderer.scale;
			renderer.setSize(window.innerWidth, window.innerHeight);
			engine.framebuffer.setSize(w,h);
			engine.camera.aspect = w/h;
			engine.camera.updateProjectionMatrix();
			resizeUniforms(w, h);

		}, 3000);
	}
}



export function updateEngine (elapsed) {
	engine.controls.update();

	engine.framebuffer.update();
	uniforms.framebuffer.value = engine.framebuffer.getTexture();
	
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