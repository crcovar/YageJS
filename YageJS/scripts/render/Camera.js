define(['render/Screen'], function (Screen) {
	var width = Screen.getWidth(),
		height = Screen.getHeight();

	function Camera(/*Entity*/entity, /*World*/world) {
		this._subject = entity;
		this._world = world;
	
		/* used for scrolling, these are percent values (float) from the edges
		of the camera to start scrolling. If these are null the camera will
		never scroll on that axis. */
		this._horizontalBound = null;
		this._verticalBound = null;
	}
	
	Camera.prototype.changeWorld = function (/*World*/world) {
		this._world = world;
	};
	
	Camera.prototype.update = function () {
		this._x = this._subject.x;
		this._y = this._subject.y;

		if (this._x < (width / 2)) {
			this._x = width / 2;
		}
		if (this._y < (height / 2)) {
			this._y = height / 2;
		}
		if (this._x > (this._world.getWidth() - width / 2)) {
			this._x = this._world.getWidth() - width / 2;
		}
		if (this._y < (this._world.getHeight() - height / 2)) {
			this_y = this._world.getHeight() - height / 2;
		}
	};
	
	return Camera;
});