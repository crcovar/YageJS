define(function() {
	'use strict';

	var entities = [],
		entityFactory = {};

	entityFactory.add = function (object) {
		entities.push(object);
	};

	entityFactory.update = function () {
		var i = 0,
			dead_indices = [];

		for (i = 0; i < entities.length; i += 1) {
			entities[i].update();
			if (entities[i].getState() === null) {
				dead_indices.push(i);
			}
		}

		for (i = dead_indices.length - 1; i >= 0; i -= 1) {
			entities.splice(dead_indices[i],1);
		}
	};

	entityFactory.draw = function () {
		var i = 0;
		for (i = 0; i < entities.length; i += 1) {
			entities[i].draw();
		}
	};

	return entityFactory;
});