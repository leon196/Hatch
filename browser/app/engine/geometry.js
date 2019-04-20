
import * as THREE from 'three.js';
import { closestPowerOfTwo, lerp, getRandomPoints } from './misc';

export default class Geometry {

	static create (attributes, subdivisions) {
		subdivisions = subdivisions || [1,1];
		var count = attributes.position.array.length / attributes.position.itemSize;
		var geometries = [];
		var verticesMax = Math.pow(2, 16);
		var dimension = closestPowerOfTwo(Math.sqrt(count));
		var geometryCount = 1 + Math.floor(count / verticesMax);
		var faces = [subdivisions[0]+1, subdivisions[1]+1];
		var quadCount = subdivisions[0] * subdivisions[1];
		var numberIndex = 0;
		for (var m = 0; m < geometryCount; ++m) {

			var vertexCount = count;
			if (geometryCount > 1) {
				if (m == geometryCount - 1) count = count % verticesMax;
				else vertexCount = verticesMax;
			}

			var arrays = {};
			var anchors = [];
			var quantities = [];
			var indexMap = [];
			var indices = [];
			var vIndex = 0;
			var attributeNames = Object.keys(attributes);
			attributeNames.forEach(name => { arrays[name] = []; });

			for (var index = 0; index < vertexCount; ++index) {
				var u = (index % dimension) / dimension;
				var v = Math.floor(index / dimension) / dimension;
				for (var y = 0; y < faces[1]; ++y) {
					for (var x = 0; x < faces[0]; ++x) {
						attributeNames.forEach(name => {
							var itemSize = attributes[name].itemSize;
							var array = attributes[name].array;
							for (var i = 0; i < itemSize; i++) {
								arrays[name].push(array[index*itemSize+i]);
							}
						});
						var anchorX = x / subdivisions[0];
						var anchorY = y / subdivisions[1];
						anchors.push(anchorX*2.-1., anchorY*2.-1.);
						indexMap.push(u,v);
						quantities.push(numberIndex / (count-1), numberIndex);
					}
				}
				for (var y = 0; y < subdivisions[1]; ++y) {
					for (var x = 0; x < subdivisions[0]; ++x) {
						indices.push(vIndex, vIndex+1, vIndex+1+subdivisions[0]);
						indices.push(vIndex+1+subdivisions[0], vIndex+1, vIndex+2+subdivisions[0]);
						vIndex += 1;
					}
					vIndex += 1;
				}
				vIndex += faces[0];
				numberIndex++;
			}

			var geometry = new THREE.BufferGeometry();
			attributeNames.forEach(name => {
				var array = new Float32Array(arrays[name]);
				geometry.addAttribute(name, new THREE.BufferAttribute(array, attributes[name].itemSize));
			});
			geometry.addAttribute( 'anchor', new THREE.BufferAttribute( new Float32Array(anchors), 2 ) );
			if (geometry.attributes.quantity == null) {
				geometry.addAttribute( 'quantity', new THREE.BufferAttribute( new Float32Array(quantities), 2 ) );
			}
			// geometry.addAttribute( 'indexMap', new THREE.BufferAttribute( new Float32Array(indexMap), 2 ) );
			geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
			geometries.push(geometry);
		}
		return geometries;
	}

	static createLine (geometry, subdivisions) {
		var positions = [];
		var nexts = [];
		var colors = [];
		// geometry = new THREE.EdgesGeometry(geometry);
		var arrayPosition = geometry.attributes.position.array;
		var index = geometry.index.array;
		var count = index.length / 3;
		var line = new THREE.BufferGeometry();
		for (var i = 0; i < count; ++i) {
			for (var t = 0; t < 3; ++t) {
				for (var x = 0; x < 3; ++x) {
					positions.push(arrayPosition[(index[i * 3 + t] * 3 + x)%arrayPosition.length]);
					nexts.push(arrayPosition[(index[i*3 + (t+1)%3] * 3 + x)%arrayPosition.length]);
				}
			}
		}
		geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
		geometry.addAttribute('next', new THREE.BufferAttribute(new Float32Array(nexts), 3));
		return Geometry.create(geometry.attributes, subdivisions);
	}

	static clone (geometryToClone, instances) {
		var geometries = [];
		var numberIndex = 0;
		var arrays = {};
		var quantities = [];
		var indices = [];
		var attributes = geometryToClone.attributes;
		var vertexCount = attributes.position.array.length/3;
		var triCount;
		if (geometryToClone.index != null) triCount = geometryToClone.index.array.length;
		var attributeNames = Object.keys(attributes);
		attributeNames.forEach(name => { arrays[name] = []; });
		for (var index = 0; index < instances; ++index) {
			attributeNames.forEach(name => {
				var array = attributes[name].array;
				for (var i = 0; i < array.length; i++) {
					arrays[name].push(array[i]);
				}
			});

			if (geometryToClone.index != null) {
				for (var v = 0; v < triCount; ++v) {
					indices.push(numberIndex*vertexCount+geometryToClone.index.array[v]);
				}
			}
			for (var v = 0; v < vertexCount; ++v) {
				quantities.push(numberIndex / (instances-1), numberIndex);
			}
			numberIndex++;
		}

		var geometry = new THREE.BufferGeometry();
		attributeNames.forEach(name => {
			geometry.addAttribute(name, new THREE.BufferAttribute(new Float32Array(arrays[name]), attributes[name].itemSize));
		});
		geometry.addAttribute( 'quantity', new THREE.BufferAttribute( new Float32Array(quantities), 2 ) );
		if (geometryToClone.index != null) {
			geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
		}
		geometries.push(geometry);
		console.log(geometries)
		return geometries;
	}

	static random (count) {
	    return {
	        position: {
	            array: getRandomPoints(count),
	            itemSize: 3
	        }
	    };
	}

	static parsePointCloud (data, step) {
		var cloud = {};
		cloud.points = [];

		cloud.middle = [0, 0, 0];
		cloud.top = -9000;
		cloud.ground = 9000;

		step = step || 10;
		var lines = data.split("\n");
		for (var l = 17; l < lines.length; l += step)
		{
			var column = lines[l].split(" ");
			if (column.length > 8)
			{
				var point = { x: parseFloat(column[0]), y: parseFloat(column[1]), z: parseFloat(column[2]) };
				point.normal = { x: parseFloat(column[3]), y: parseFloat(column[4]), z: parseFloat(column[5]) };
				point.color = { r: parseInt(column[6]) / 255, g: parseInt(column[7]) / 255, b: parseInt(column[8]) / 255, a: parseInt(column[9]) / 255 };
				cloud.points.push(point);

				cloud.middle[0] += point.x;
				cloud.middle[1] += point.y;
				cloud.middle[2] += point.z;

				cloud.top = Math.max(cloud.top, point.y);
				cloud.ground = Math.min(cloud.ground, point.y);
			}
		}

		cloud.middle[0] /= cloud.points.length;
		cloud.middle[1] /= cloud.points.length;
		cloud.middle[2] /= cloud.points.length;

		cloud.ground = cloud.ground;

		return cloud;
	}
}
