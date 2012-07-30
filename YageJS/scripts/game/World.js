define(['render/ArtAssetFactory', 'utils/AudioAssetFactory'], function (artAssetFactory, audioAssetFactory) {
	var request = new XMLHttpRequest(),
		response;

	/**
	 * Defines the size of the current level, worlds operate on the first
	 * quadrant. The camera module will handle the translation to quadrant four
	 * Width and Height of the world must be at least the same as the Screen.
	 */
	function World(game, id) {
		request.open('GET', 'games/' + game + '/' + id + '.json', false);
		request.send();
		if(request.status === 200) {
			response = JSON.parse(request.responseText);
			this.width = response.world.width;
			this.height = response.world.height;
			this.asset = artAssetFactory.load(response.world.asset);
			this.bgMusic = audioAssetFactory.load(response.world.bgMusic);

			this.getWidth = function () { return this.width; };
			this.getHeight = function () { return this.height; };
		}
	}

	World.prototype.update = function () {
		audioAssetFactory.play(this.bgMusic);
	};

	return World;
});