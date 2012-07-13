define(['utils/EventHandler', 'render/Screen'], function (eventHandler, screen) {
	'use strict';

	var assets = {},	// stores the ArtAsset objects
		counts = {},	// tracks the number of active references to an ArtAsset object
		assetFactory = {};

	/**
	 * The Object that holds the content and all relevent meta data about it,
	 * such as frame sizes and locations, and animation sequences.
	 * @param id The unique identifier of the asset, used for looking up the
	 *           PNG file and related JSON file.
	 */
	function ArtAsset2d(/*String*/id) {
		var request = new XMLHttpRequest(),
			that = {};

		request.open("GET", 'assets/' + id + '/' + id + '.json', false);
		request.send();
		that = JSON.parse(request.responseText);

		that.image = new Image();
		that.image.src = 'assets/' + id + '/' + id + '.png';

		return that;
	}

	/**
	 * Reference to an ArtAsset, and tracks current state.
	 * @param id unique identifier of the ArtAsset being referenced
	 */
	function ArtAssetRef(/*String*/id) {
		this.id = id;
		this.currentFrame = 0;
		this.animation = 'default';
	}

	/**
	 * Changes the animation currently being used
	 * @param animationName The name of the new animation to cycle through. If
	 *                      animationName is the same as the current animation,
	 *                      no action is taken.
	 */
	ArtAssetRef.prototype.changeAnimation = function (/*String*/animationName) {
		if (animationName === this.animation) {
			return;
		}

		if (typeof assets[this.id][animationName] !== 'undefined') {
			this.animation = animationName;
			this.currentFrame = 0;
		}
	};

	/**
	 * Fires off a draw event containing the world coordinates and reference
	 * information. The event will be picked up by a Camera object that will
	 * determine the view coordinates and call the draw method of the factory
	 */
	ArtAssetRef.prototype.draw = function (/*int*/worldX, /*int*/worldY) {
		if (this.currentFrame < assets[this.id][this.animation].sequence.length - 1) {
			this.currentFrame++;
		} else if (assets[this.id][this.animation.repeat]) {
			this.currentFrame = 0;
		}

		var data = {
			x: worldX,
			y: worldY,
			reference: this
		};

		eventHandler.fire('draw', data);
	};

	/**
	 * Loads an asset into memory if needed, and returns a reference.
	 * @param id unique identifier of the asset to be referenced and/or loaded.
	 * @return
	 */
	assetFactory.load = function (/*String*/id) {
		if (typeof assets[id] === 'undefined') {
			assets[id] = new ArtAsset2d(id);
		}

		if (typeof counts[id] !== 'number') {
			counts[id] = 0;
		}
		counts[id]++;

		return new ArtAssetRef(id);
	};

	/**
	 * Draws an asset to the screen, based on the reference provided.
	 * @param x
	 * @param y
	 * @param ref
	 */
	assetFactory.draw = function (/*int*/x, /*int*/y, /*ArtAssetRef*/ref) {
		screen.drawImage(assets[ref.id].image,
			assets[ref.id].x[assets[ref.id][ref.animation].sequence[ref.currentFrame]],
			assets[ref.id].y[assets[ref.id][ref.animation].sequence[ref.currentFrame]],
			assets[ref.id].w[assets[ref.id][ref.animation].sequence[ref.currentFrame]],
			assets[ref.id].h[assets[ref.id][ref.animation].sequence[ref.currentFrame]],
			x - (assets[ref.id].w[assets[ref.id][ref.animation].sequence[ref.currentFrame]] / 2),
			y - (assets[ref.id].h[assets[ref.id][ref.animation].sequence[ref.currentFrame]] / 2),
			assets[ref.id].w[assets[ref.id][ref.animation].sequence[ref.currentFrame]],
			assets[ref.id].h[assets[ref.id][ref.animation].sequence[ref.currentFrame]]);
	};

	return assetFactory;
});