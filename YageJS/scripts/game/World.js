define(['render/ArtAssetFactory'], function (artAssetFactory) {
	var request = new XMLHttpRequest(),
		response;

	/**
	 * Defines the size of the current level, worlds operate on the first
	 * quadrant. The camera module will handle the translation to quadrant four
	 * Width and Height of the world must be at least the same as the Screen.
	 */
	function World(game, id) {
		var that = {};

		request.open('GET', 'games/' + game + '/' + id + '.json', false);
		request.send();
		if(request.status === 200) {
			response = JSON.parse(request.responseText);
			that.width = response.world.width;
			that.height = response.world.height;
			that.asset = artAssetFactory.load(response.world.asset);

			that.getWidth = function () { return this.width; };
			that.getHeight = function () { return this.height; };
		}

		return that;
	}

	return World;
});