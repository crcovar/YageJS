define(['game/Player', 'utils/keyCodes', 'game/EntityFactory', 'render/Screen'], function (Player, keys, entityFactory, page) {
	var Game = {},
		VELOCITY = 8,
		Players = [];

	Game.keys = keys;
	Game.VELOCITY = VELOCITY;
	Game.Players = Players;
	Game.entityFactory = entityFactory;

	Players.push(new Player('sprite'));

	Game.update = function () {
		var i = 0;

		for (i = 0; i < Players.length; i += 1) {
			Players[i].update();
		}

		entityFactory.update();
	};

	Game.draw = function () {
		var i = 0;

		page.clear();

		for (i = 0; i < Players.length; i += 1) {
			Players[i].draw();
		}

		entityFactory.draw();
	};

	return Game;
});