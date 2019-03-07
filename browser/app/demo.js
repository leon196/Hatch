
import * as THREE from 'three.js';
import assets from './engine/assets';
import Mouse from './engine/mouse';
import { engine, initEngine, updateEngine, resizeEngine } from './project/engine';

export default function() {

	assets.load(function() {
		initEngine();
		onWindowResize();
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('mousemove', Mouse.onMove, false);
		requestAnimationFrame(animate);
	});

	function animate(elapsed) {
		updateEngine(elapsed / 1000);
		requestAnimationFrame(animate);
	}

	function onWindowResize() {
		resizeEngine(window.innerWidth, window.innerHeight);
	}
}
