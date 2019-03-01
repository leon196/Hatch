
import assets from '../engine/assets';
import * as makeText from '../engine/make-text';
import { generateCurve, add, addWireframe, addShape2D } from './helper';

export function addText () {

	addShape2D(assets.shaders.shape2D.clone(),
	[.0,.0,1,1], // rect.xyzw
	[0,0], // anchor
	[0,40], // offset
	makeText.createTexture([{
		text: 'cookie',
		font: 'bebasneue_bold',
		fillStyle: '#bdbdbd',
		width: 1024,
		height: 1024,
		fontSize: 150,
		offsetY: -90,
		textAlign: 'center',
		textBaseline: 'middle',
	},{
		text: 'demoparty',
		font: 'bebasneue_bold',
		fillStyle: '#bdbdbd',
		fontSize: 85,
		offsetY: 0,
	},{
		text: 'NOV 30 - DEC 1, 2018',
		font: 'bebasneue_bold',
		fillStyle: '#bdbdbd',
		fontSize: 65,
		offsetY: 80,
	},{
		text: 'AT FOLIE NUMERIQUE',
		font: 'bebasneue_bold',
		fillStyle: '#bdbdbd',
		fontSize: 50,
		offsetY: 150,
	},{
		text: 'PARIS, FRANCE',
		font: 'bebasneue_bold',
		fillStyle: '#bdbdbd',
		fontSize: 70,
		offsetY: 200,
	},{
		text: 'more info coming soon',
		font: 'bebasneue_bold',
		fillStyle: '#a3a3a3',
		fontSize: 40,
		offsetY: 280,
	}]));

}