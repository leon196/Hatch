
import * as THREE from 'three.js';
import assets from './engine/assets';
import renderer from './engine/renderer';
import parameters from './engine/parameters';
import * as timeline from './engine/timeline';
import { OrbitControls } from '../libs/OrbitControls';
import { clamp, lerp, lerpArray, lerpVector, lerpVectorArray, saturate } from './engine/misc';
import { generateCurve, add, addWireframe, addShape2D } from './project/helper';
import { engine, initEngine, updateEngine } from './project/engine';
import { uniforms, initUniforms, updateUniforms, resizeUniforms } from './project/uniform';
import { addText } from './project/text';
import { gui } from './engine/gui';
import Geometry from './engine/geometry';
import Mouse from './engine/mouse';

export default function() {

	var uniforms = 
    {
			time: { value: 0 },
			timeLoop: { value: 0 },
			resolution: { value: [window.innerWidth, window.innerHeight] },
			mouse: { value: [window.innerWidth/2, window.innerHeight/2] },
			cameraPos: { value: [0,0,0] },
			cameraTarget: { value: [0,0,0] },
			frame: { value: 0 }, 
			blur: { value: 0 }, 
			bloom: { value: 0 }, 
		};

	assets.load(function() {
		initEngine();

		assets.shaders.render.uniforms = uniforms;
		uniforms.frame.value = engine.frametarget.texture;
		uniforms.blur.value = engine.bloom.blurTarget.texture;
		uniforms.bloom.value = engine.bloom.bloomTarget.texture;

		// add(assets.shaders.basic, [assets.geometries.title]).forEach(mesh => mesh.castShadow = true );
		// add(assets.shaders.greets, [assets.geometries.greets.children[0].geometry]).forEach(mesh => mesh.castShadow = true );
		// add(assets.shaders.lensflare, Geometry.create(Geometry.random(20)));
		// // add(assets.shaders.uilines, Geometry.create(Geometry.random(20)));
		// add(assets.shaders.satelitte, [assets.geometries.satelitte]).forEach(mesh => mesh.castShadow = true );
		// add(assets.shaders.panel, [assets.geometries.panel]).forEach(mesh => mesh.castShadow = true );
		// add(assets.shaders.cookie, Geometry.createLine(assets.geometries.cookie));
		// add(assets.shaders.cookieChunk, Geometry.createLine(Geometry.clone(assets.geometries.ico, 40.)[0]));

		// add(assets.shaders.pepite, [new THREE.DodecahedronBufferGeometry(1, 0)]);

		// add(assets.shaders.cloud, [new THREE.PlaneGeometry(100,100,1,1)]);
		// add(assets.shaders.desert, [new THREE.PlaneGeometry(100,100,100,100)]).forEach(mesh => mesh.receiveShadow = true );
		// add(assets.shaders.sky, [new THREE.DodecahedronBufferGeometry(900, 3)]);
		// add(assets.shaders.cable, Geometry.create(Geometry.random(10), [5,500])).forEach(mesh => mesh.receiveShadow = true );

		onWindowResize();
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('mousemove', Mouse.onMove, false);
		requestAnimationFrame(animate);
		timeline.start();
	});

	function animate(elapsed) {
		requestAnimationFrame(animate);
		engine.timeLoop = elapsed / 1000.;
		elapsed = timeline.getTime();

		updateEngine(elapsed);
		updateUniforms(elapsed);
		
		// renderer.render(engine.sceneCloud, engine.camera, engine.frameCloud, true);
		// renderer.render(engine.scene, engine.camera, engine.frametarget, true);
		// engine.bloom.render(renderer);
		// renderer.render(engine.framerender, engine.camera);
		renderer.render(engine.framerender, engine.camera);
	}

	function onWindowResize() {
		var w = window.innerWidth / renderer.scale;
		var h = window.innerHeight / renderer.scale;
		renderer.setSize(window.innerWidth, window.innerHeight);
		engine.bloom.resize();
		engine.frametarget.setSize(w,h);
		engine.camera.aspect = w/h;
		engine.camera.updateProjectionMatrix();
		resizeUniforms(w, h);
	}
}
