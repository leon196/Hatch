/* eslint-disable */
/* This file is generated with "npm run assets", do not edit by hand. */
import descriptors from "../../asset/descriptors.json!";
import makeAnimations from "./make-animations";
import { OBJLoader } from "../libs/OBJLoader";
import { PLYLoader } from "../libs/PLYLoader";
import * as THREE from "three.js";
import shaderHeader from "../../asset/shader/header.glsl!text";
import animation_scene_json from "../../asset/animation/scene.json!text";
import mesh_cookie_ply from "../../asset/mesh/cookie.ply!text";
import shader_bloom_bloom_frag from "../../asset/shader/bloom/bloom.frag!text";
import shader_bloom_bloom_vert from "../../asset/shader/bloom/bloom.vert!text";
import shader_bloom_bright_frag from "../../asset/shader/bloom/bright.frag!text";
import shader_bloom_bright_vert from "../../asset/shader/bloom/bright.vert!text";
import shader_bloom_gaussian_blur_frag from "../../asset/shader/bloom/gaussian_blur.frag!text";
import shader_bloom_gaussian_blur_vert from "../../asset/shader/bloom/gaussian_blur.vert!text";
import shader_chocolat_frag from "../../asset/shader/chocolat.frag!text";
import shader_chocolat_vert from "../../asset/shader/chocolat.vert!text";
import shader_desert_frag from "../../asset/shader/desert.frag!text";
import shader_desert_vert from "../../asset/shader/desert.vert!text";
import shader_fullscreen_vert from "../../asset/shader/fullscreen.vert!text";
import shader_render_frag from "../../asset/shader/render.frag!text";
import shader_shape2D_frag from "../../asset/shader/shape2D.frag!text";
import shader_shape2D_vert from "../../asset/shader/shape2D.vert!text";
import shader_star_frag from "../../asset/shader/star.frag!text";
import shader_star_vert from "../../asset/shader/star.vert!text";
import shader_wireframe_frag from "../../asset/shader/wireframe.frag!text";
import shader_wireframe_vert from "../../asset/shader/wireframe.vert!text";
const plyLoader = new PLYLoader();
const objLoader = new OBJLoader();
const fontLoader = new THREE.FontLoader();
export default {
animations: makeAnimations(JSON.parse(animation_scene_json)),
geometries: {
cookie: plyLoader.parse(mesh_cookie_ply),
},
fonts: {
},
shaders: {
wireframe: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.wireframe, {
vertexShader: shaderHeader + shader_wireframe_vert,
fragmentShader: shaderHeader + shader_wireframe_frag,
})),
desert: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.desert, {
vertexShader: shaderHeader + shader_desert_vert,
fragmentShader: shaderHeader + shader_desert_frag,
})),
star: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.star, {
vertexShader: shaderHeader + shader_star_vert,
fragmentShader: shaderHeader + shader_star_frag,
})),
chocolat: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.chocolat, {
vertexShader: shaderHeader + shader_chocolat_vert,
fragmentShader: shaderHeader + shader_chocolat_frag,
})),
shape2D: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.shape2D, {
vertexShader: shaderHeader + shader_shape2D_vert,
fragmentShader: shaderHeader + shader_shape2D_frag,
})),
bloom: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.bloom, {
vertexShader: shaderHeader + shader_bloom_bloom_vert,
fragmentShader: shaderHeader + shader_bloom_bloom_frag,
})),
bright: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.bright, {
vertexShader: shaderHeader + shader_bloom_bright_vert,
fragmentShader: shaderHeader + shader_bloom_bright_frag,
})),
gaussian_blur: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.gaussian_blur, {
vertexShader: shaderHeader + shader_bloom_gaussian_blur_vert,
fragmentShader: shaderHeader + shader_bloom_gaussian_blur_frag,
})),
render: new THREE.ShaderMaterial(Object.assign({}, descriptors.shaders.render, {
vertexShader: shaderHeader + shader_fullscreen_vert,
fragmentShader: shaderHeader + shader_render_frag,
})),
},
load: function(callback) { return callback(); }
};