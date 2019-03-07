
import * as THREE from 'three.js';
import PlaneBright from './plane_bright.js';
import PlaneBlur from './plane_blur.js';
import PlaneBloom from './plane_bloom.js';

export default class Bloom {
  constructor(tex_base) {
    this.blurCount = 3;
    this.renderTarget = [
      new THREE.WebGLRenderTarget(window.innerWidth / 4, window.innerHeight / 4),
      new THREE.WebGLRenderTarget(window.innerWidth / 4, window.innerHeight / 4),
    ];
    this.scene = {
      bright: new THREE.Scene(),
      blurh: new THREE.Scene(),
      blurv: new THREE.Scene(),
      bloom: new THREE.Scene(),
    };
    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 2)
    this.plane = {
      bright: new PlaneBright(tex_base),
      blurh: new PlaneBlur(this.renderTarget[0].texture, new THREE.Vector2(1.0, 0.0)),
      blurv: new PlaneBlur(this.renderTarget[1].texture, new THREE.Vector2(0.0, 1.0)),
      bloom: new PlaneBloom(tex_base, this.renderTarget[0].texture),
    };
    this.blurTarget = this.renderTarget[0];
    this.bloomTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.init();
  }
  init() {
    this.scene.bright.add(this.plane.bright.mesh);
    this.scene.blurh.add(this.plane.blurh.mesh);
    this.scene.blurv.add(this.plane.blurv.mesh);
    this.scene.bloom.add(this.plane.bloom.mesh);
  }
  render(renderer) {
    renderer.setRenderTarget(this.renderTarget[0]);
    renderer.render(this.scene.bright, this.camera);
    for (var i = 0; i < this.blurCount; i++) {
      renderer.setRenderTarget(this.renderTarget[1]);
      renderer.render(this.scene.blurh, this.camera);
      renderer.setRenderTarget(this.renderTarget[0]);
      renderer.render(this.scene.blurv, this.camera);
    }
    // renderer.setRenderTarget(this.bloomTarget);
    // renderer.render(this.scene.bloom, this.camera);
    renderer.setRenderTarget(null);
  }
  resize() {
    this.renderTarget[0].setSize(window.innerWidth / 4, window.innerHeight / 4);
    this.renderTarget[1].setSize(window.innerWidth / 4, window.innerHeight / 4);
    this.plane.blurh.resize();
    this.plane.blurv.resize();
    this.bloomTarget.setSize(window.innerWidth, window.innerHeight);
  }
}
