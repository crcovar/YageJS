define(['render/ArtAssetFactory', 'render/Screen', 'utils/EventHandler'], function (artAssetFactory, screen, eventHandler) {
	var width = screen.getWidth(),
		height = screen.getHeight();

	/**
	 * Camera Object. Follows an entity around a given world
	 * @param subject
	 * @param world
	 */
	function Camera(/*Entity*/subject, /*World*/world) {
		var self = this;

		this._subject = subject;
		this._world = world;
		this._toDraw = [];
		this._x = 0;
		this._y = 0;

		/* used for scrolling, these are percent values (float) from the edges
		of the camera to start scrolling. If these are null the camera will
		never scroll on that axis. */
		this._horizontalBound = 0.63;
		this._verticalBound = 0.3;

		eventHandler.on('draw', function (event) { return self.onDraw(event); });
	}

	/**
	 * Sets the world that binds the camera
	 * @param world
	 */
	Camera.prototype.changeWorld = function (/*World*/world) {
		this._world = world;
	};

	/**
	 * If necessary moves the Camera as determined by bounds. Ensures Camera
	 * stays within the confines of the set World
	 */
	Camera.prototype.update = function () {
		var hBound = this._horizontalBound * (width / 2),
			vBound = this._verticalBound * (height / 2);

		if (this._subject.x - this._x > hBound) {
			this._x += (this._subject.x - this._x) - hBound;
		} else if (this._x - this._subject.x > hBound) {
			this._x -= (this._x - this._subject.x) - hBound;
		}

		if (this._subject.y - this._y > vBound) {
			this._y += (this._subject.y - this._y) - vBound;
		} else if (this._y - this._subject.y > vBound) {
			this._y -= (this._y - this._subject.y) - vBound;
		}

		if (this._x < (width / 2)) {
			this._x = width / 2;
		}
		if (this._y < (height / 2)) {
			this._y = height / 2;
		}
		if (this._x > (this._world.getWidth() - width / 2)) {
			this._x = this._world.getWidth() - width / 2;
		}
		if (this._y > (this._world.getHeight() - height / 2)) {
			this._y = this._world.getHeight() - height / 2;
		}
	};

	/**
	 * Action to take when the Camera receives a draw event. In this case
	 * compute view coordinates and call the draw method of the artAssetFactory
	 * @param event
	 */
	Camera.prototype.onDraw = function (event) {
		var x = event.x - (this._x - (width / 2)),
			y = height - (event.y - (this._y - (height / 2)));
		artAssetFactory.draw(x, y, event.reference);
	};

	/**
	 * Clears the screen, draws the world, then draw other objects
	 */
	Camera.prototype.draw = function () {
		screen.clear();

		artAssetFactory.drawScreen(this._x - (width / 2), this._world.getHeight() - this._y - (height / 2), this._world);

		this._subject.draw();
	};

	return Camera;
});