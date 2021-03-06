define(['game/Player',
        'game/World',
        'utils/keyCodes',
        'game/EntityFactory',
        'render/Camera',
        'render/Screen'], function (Player, World, keys, entityFactory, Camera, page) {
	var Game = {
			id: 'sample'
	},
		player = new Player('sprite'),
		world = new World(Game.id, 'level1'),
		camera = new Camera(player, world);

	world.addPlayer(player);
	Game.entityFactory = entityFactory;

	Game.update = function () {
		world.update();
		camera.update();

		entityFactory.update();
	};

	Game.draw = function () {
        world.draw();
		camera.draw();
	};

	return Game;
});