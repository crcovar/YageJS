define(['game/Player',
        'game/World',
        'utils/keyCodes',
        'game/EntityFactory',
        'render/Camera',
        'render/Screen'], function (Player, World, keys, entityFactory, Camera, page) {
	var Game = {},
		player = new Player('sprite'),
		world = new World('testWorld'),
		camera = new Camera(player, world);

	Game.entityFactory = entityFactory;

	Game.update = function () {
		player.update();
		camera.update();

		entityFactory.update();
	};

	Game.draw = function () {
		camera.draw();
	};

	return Game;
});