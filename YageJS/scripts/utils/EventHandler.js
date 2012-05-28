define([], function () {
	'use strict';

	function Handle(callback) {
		this.callback = callback;
	}

	var eventHandler = {},
		handles = {};

	eventHandler.on = function (name, callback) {
		if (!handles.hasOwnProperty(name)) {
			handles[name] = [];
		}

		handles[name].push(new Handle(callback));
	};

	eventHandler.fire = function (name, event) {
		if (handles.hasOwnProperty(name)) {
			var i = 0;
			for (i = 0; i < handles[name].length; i += 1) {
				handles[name][i].callback(event);
			}
		}
	};

	return eventHandler;
});