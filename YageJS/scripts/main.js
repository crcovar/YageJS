require.config({
	baseURL: 'scripts',
	scriptType: 'application/javascript'
});

require(['game/YageJS', 'utils/systemEvents!'], function(Game) {
	'use strict';

	var RATE30 = 1000 / 30,
		RATE60 = 1000 / 60;

	// start running the loops
	setInterval(Game.update, RATE30);
	setInterval(Game.draw, RATE30);
});