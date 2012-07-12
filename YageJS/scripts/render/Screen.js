/*jslint maxerr: 50, indent: 4 */
/*globals define */
define(['lib/domReady!'], function (doc) {
	'use strict';

	var screen = {},
		width = 640,
		height = 480,
		canvas = doc.getElementById('screen'),
		context;

	if (!canvas) {
		canvas = doc.createElement('canvas');
		canvas.setAttribute('id', 'screen');
		doc.body.insertBefore(canvas);
	}

	context = canvas.getContext('2d');

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