define(['render/ArtAssetFactory'], function (artAssetFactory) {
	/**
	 * Defines the size of the current level, worlds operate on the first
	 * quadrant. The camera module will handle the translation to quadrant four
	 * Width and Height of the world must be at least the same as the Screen.
	 */
	function World(id) {
		var that = new artAssetFactory.load(id);

		return that;
	}

	return World;
});