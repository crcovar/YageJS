/*jslint maxerr: 50, indent: 4 */
/*globals define */
define(['render/Screen'], function (page) {
	'use strict';

	var ps = {},
		//name = ["one", "two", "nil"],
		image = [],
		speed = [0, 0.5, 1],
		position = [0, 0, 0],
		anchor = 2,
		vertical = true;

	ps.scrollForward = function (scrollSpeed) {
		var i = 0;
		for (i = 0; i < position.length; i += 1) {
			position[i] += speed[i] * scrollSpeed;
			if (vertical && position[i] > page.resolution.height) {
				position[i] = -page.resolution.height;
			} else if (!vertical && position[i] > page.resolution.width) {
				position[i] = -page.resolution.width;
			}
		}
	};

	ps.scrollBackward = function (scrollSpeed) {
		var i = 0;
		for (i = 0; i < position.length; i += 1) {
			position[i] -= speed[i] * scrollSpeed;
			if (vertical && position[i] < -page.resolution.height) {
				position[i] = page.resolution.height;
			} else if (!vertical && position[i] < -page.resolution.width) {
				position[i] = page.resolution.width;
			}
		}
	};

	ps.draw = function (anchorDraw) {
		var i = 0;
		for (i = 0; i < position.length; i += 1) {
			if (i === anchor) {
				anchorDraw();
			} else {
				if (vertical) {
					page.context.drawImage(image[i], 0, position[i]);
					// check to see if we need to draw multiple images
					if (position[i] > 0) {
						page.context.drawImage(image[i], 0, position[i] - page.resolution.height);
					} else if (position[i] < 0) {
						page.context.drawImage(image[i], 0, position[i] + page.resolution.height);
					}
				} else {
					page.context.drawImage(image[i], position[i], 0);
					// check to see if we need to draw multiple images
					if (position[i] > 0) {
						page.context.drawImage(image[i], position[i] - page.resolution.width, 0);
					} else if (position[i] < 0) {
						page.context.drawImage(image[i], position[i] + page.resolution.width, 0);
					}
				}
			}
		}
	};

	return ps;
});

