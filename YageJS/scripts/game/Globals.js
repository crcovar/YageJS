define(['utils/keyCodes', 'game/EntityFactory'], function (keyCodes, EntityFactory) {
	globals = {};
	globals.keys = keyCodes;

	globals.RATE30 = 1000 / 30;
	globals.RATE60 = 1000 / 60;

	globals.VELOCITY = 8;

	globals.Players = [];
	globals.entityFactory = EntityFactory;

	return globals;
});