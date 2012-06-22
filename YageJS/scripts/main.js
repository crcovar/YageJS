require.config({
	baseURL: 'scripts',
	scriptType: 'application/javascript'
});

require(['game/YageJS', 'utils/systemEvents!'], function(Game) {
	'use strict';

	var RATE30 = 1000 / 30,
		RATE60 = 1000 / 60;

	function update(rate) {
		Game.update();
		setTimeout(function () { return update(rate); }, rate);
	}

	function draw(rate) {
		Game.draw();
		setTimeout(function () { return draw(rate); }, rate);
	}

	// start running the loops
	update(RATE30);
	draw(RATE30);

});