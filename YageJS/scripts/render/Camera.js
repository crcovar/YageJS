define(['render/ArtAssetFactory', 'render/Screen', 'utils/EventHandler'], function (artAssetFactory, screen, eventHandler) {
	var width = screen.getWidth(),
		height = screen.getHeight();

	function Drawable(x, y, image) {
		this.x = x;
		this.y = y;
		this.image = image;
	}

	function Camera(/*Entity*/entity, /*World*/world) {
		var self = this;

		this._subject = entity;
		this._world = world;
		this._toDraw = [];
		this._x = 0;
		this._y = 0;

		/* used for scrolling, these are percent values (float) from the edges
		of the camera to start scrolling. If these are null the camera will
		never scroll on that axis. */
		this._horizontalBound = null;
		this._verticalBound = null;

		eventHandler.on('draw', function (event) { return self.onDraw(event); });
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

	Camera.prototype.onDraw = function (event) {
		var x = event.x - (this._x - (width / 2)),
			y = height - (event.y - (this._y - (height / 2)));
		artAssetFactory.draw(x, y, event.reference);
	};

	Camera.prototype.draw = function () {
		screen.clear();

		screen.drawImage(this._world.image, this._x - (width / 2),
				this._world.getHeight() - this._y - (height / 2), width, height,
				0, 0, width, height);

		this._subject.draw();
	};

	return Camera;
});