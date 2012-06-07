define(function (require) {
	return {
		keys: require('utils/keyCodes'),

		RATE30: 1000 / 30,
		RATE60: 1000 / 60,

		VELOCITY: 8,

		Players: [],
		entityFactory: require('game/EntityFactory')
	};
});