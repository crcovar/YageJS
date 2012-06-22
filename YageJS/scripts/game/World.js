define([], function () {
	/*
	 * Defines the size of the current level, worlds operate on the first
	 * quadrant. The camera module will handle the translation to quadrant four
	 * Width and Height of the world must be at least the same as the Screen.
	 */
	function World(width, height) {
		var w = width,
			h = height;
		
		this.getWidth = function () { return w; };
		this.getHeight = function () { return h; };
	}
	
	return World;
});