define(['utils/EventHandler'], function (EventHandler) {
	'use strict';
	var keyboard = new Array(128),

		onKeyDown = function (event) {
			keyboard[event.keyCode] = true;
			event.keyboard = keyboard;
			EventHandler.fire('keydown', event);
		},
		onKeyUp = function (event) {
			keyboard[event.keyCode] = false;
			event.keyboard = keyboard;
			EventHandler.fire('keyup', event);
		},
		onMouseDown = function (event) {
			event.keyboard = keyboard;
			EventHandler.fire('mousedown', event);
		},
		onMouseUp = function (event) {
			event.keyboard = keyboard;
			EventHandler.fire('mouseup', event);
		},
		onMouseClick = function (event) {
			event.keyboard = keyboard;
			EventHandler.fire('mouseclick', event);
		};

	return {
		load: function (name, req, load, config) {
			if (typeof document !== 'undefined') {
				document.addEventListener('keydown', onKeyDown, true);
				document.addEventListener('keyup', onKeyUp, true);
				document.addEventListener('mousedown', onMouseDown, true);
				document.addEventListener('mouseup', onMouseUp, true);
				document.addEventListener('mouseclick', onMouseClick, true);
			}
			load(null);
		}
	};
});