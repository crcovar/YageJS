define(['render/ArtAsset2d'], function (ArtAsset2d) {
	/*
	 * Defines the size of the current level, worlds operate on the first
	 * quadrant. The camera module will handle the translation to quadrant four
	 * Width and Height of the world must be at least the same as the Screen.
	 */
	function World(id) {
		var that = new ArtAsset2d(id);

		that.getWidth = function () { return this.w[0]; };
		that.getHeight = function () { return this.h[0]; };

		return that;
	}

	return World;
});