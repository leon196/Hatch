
import * as THREE from 'three.js';
import assets from './engine/assets';
import renderer from './engine/renderer';
import parameters from './engine/parameters';
import * as timeline from './engine/timeline';
import { clamp, lerp, lerpArray, lerpVector, lerpVectorArray, saturate } from './engine/misc';
import { generateCurve, add, addWireframe, addShape2D } from './project/helper';
import { engine, initEngine, updateEngine } from './project/engine';
import { uniforms, initUniforms, updateUniforms, resizeUniforms } from './project/uniform';
import { addText } from './project/text';
import { gui } from './engine/gui';
import Geometry from './engine/geometry';
import Mouse from './engine/mouse';

export default function() {

	assets.load(function() {
		initUniforms();
		initEngine();

		gui.add(engine, 'screenshot');

		assets.shaders.render.uniforms = uniforms;

		onWindowResize();
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('mousemove', Mouse.onMove, false);
		requestAnimationFrame(animate);
		timeline.start();
	});

	function animate(elapsed) {
		requestAnimationFrame(animate);
		elapsed = elapsed / 1000;

		updateEngine(elapsed);
		updateUniforms(elapsed);

		renderer.render(engine.scene, engine.camera);
	}

	function onWindowResize() {
		var w = window.innerWidth / renderer.scale;
		var h = window.innerHeight / renderer.scale;
		renderer.setSize(window.innerWidth, window.innerHeight);
		engine.framebuffer.setSize(w,h);
		engine.camera.aspect = w/h;
		engine.camera.updateProjectionMatrix();
		resizeUniforms(w, h);
	}
}
