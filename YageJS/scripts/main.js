require.config({
	baseURL: 'scripts',
	scriptType: 'application/javascript'
});

require(['render/Screen', 'game/Player', 'game/Globals', 'utils/systemEvents!'], function(page, Player, Globals) {
	'use strict';

	function update(rate) {
		var i = 0;

		for (i = 0; i < Globals.Players.length; i += 1) {
			Globals.Players[i].update();
		}

		Globals.entityFactory.update();

		setTimeout(function () { return update(rate); }, rate);
	}

	function draw(rate) {
		var i = 0;

		page.clear();

		for (i = 0; i < Globals.Players.length; i += 1) {
			Globals.Players[i].draw();
		}

		Globals.entityFactory.draw();

		setTimeout(function () { return draw(rate); }, rate);
	}

	Globals.Players.push(new Player('sprite'));

	// start running the loops
	update(Globals.RATE30);
	draw(Globals.RATE30);

});