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

	Camera.prototype.changeWorld = function (/*World*/world) {
		this._world = world;
	};

	Camera.prototype.update = function () {
		if (this._subject.x - this._x > this._horizontalBound * (width / 2)) {
			this._x += (this._subject.x - this._x) - (this._horizontalBound * (width / 2));
		} else if (this._x - this._subject.x > this._horizontalBound * (width / 2)) {
			this._x -= (this._x - this._subject.x) - (this._horizontalBound * (width / 2));
		}

		if (this._subject.y - this._y > this._verticalBound * (height / 2)) {
			this._y += (this._subject.y - this._y) - (this._verticalBound * (height / 2));
		} else if (this._y - this._subject.y > this._verticalBound * (height / 2)) {
			this._y -= (this._y - this._subject.y) - (this._verticalBound * (height / 2));
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

	Camera.prototype.onDraw = function (event) {
		var x = event.x - (this._x - (width / 2)),
			y = height - (event.y - (this._y - (height / 2)));
		artAssetFactory.draw(x, y, event.reference);
	};

	Camera.prototype.draw = function () {
		screen.clear();

		artAssetFactory.drawScreen(this._x - (width / 2), this._world.getHeight() - this._y - (height / 2), this._world);

		this._subject.draw();
	};

	return Camera;
});