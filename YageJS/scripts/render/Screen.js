/*jslint maxerr: 50, indent: 4 */
/*globals define */
define(['lib/domReady!'], function (doc) {
	'use strict';

	var screen = {},
		width = 640,
		height = 480,
		fontCSS = doc.createElelemtn('link');
		canvas = doc.getElementById('screen'),
		context;

	fontCSS.href = 'http://fonts.googleapis.com/css?family=Press+Start+2P';
	fontCSS.rel = 'stylesheet';
	fontCSS.type = 'text/css';
	doc.head.appendChild(fontCSS);

	if (canvas === null) {
		canvas = doc.createElement('canvas');
		canvas.setAttribute('id', 'screen');
		doc.body.insertBefore(canvas);
	}

	context = canvas.getContext('2d');
	context.font = "font-family: 'Press Start 2P', cursive;";

	screen.getWidth = function () {
		return width;
	};

	screen.getHeight = function () {
		return height;
	};

	screen.clear = function() {
		canvas.width = width;
		canvas.height = height;
	};

	screen.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
		context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
	};

	screen.drawText = function (string, x, y) {
		context.fillText(string, x, y);
	};

	return screen;
});