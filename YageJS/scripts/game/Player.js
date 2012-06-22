/*jslint browser: true, maxerr: 50, indent: 4 */
/*global define*/
define(['render/Screen',
        'render/ArtAsset2d',
        'utils/EventHandler',
        'utils/keyCodes',
        'game/Entity'], function (page, Asset, EventHandler, keys, Entity) {
	'use strict';
	var keyboard = [],
		VELOCITY = 8;

	Player.prototype = new Entity();
	Player.prototype.constructor = Player;
	function Player(id) {
		this.id = id;

		this.x = 0;
		this.y = 0;

		this.assets = new Asset(id);
		this.changeState('idle');
		this.currentFrame = 0;

		EventHandler.on('keydown', this.input);
		EventHandler.on('keyup', this.input);
	}

	Player.prototype.input = function (event) {
		keyboard = event.keyboard;
	};

	Player.prototype.moveLeft = function () {
		this.x -= VELOCITY;
	};

	Player.prototype.moveRight = function () {
		this.x += VELOCITY;
	};

	Player.prototype.moveUp = function () {
		this.y -= VELOCITY;
	};

	Player.prototype.moveDown = function () {
		this.y += VELOCITY;
	};

	Player.prototype.changeState = function (state) {
		if (Entity.prototype.changeState.call(this, state)) {
			this.currentFrame = 0;
		}
	};

	Player.prototype.update = function () {
		if (keyboard[keys.W] || keyboard[keys.UP_ARROW]) {
			this.moveUp();
		}
		if (keyboard[keys.S] || keyboard[keys.DOWN_ARROW]) {
			this.moveDown();
		}
		if (keyboard[keys.A] || keyboard[keys.LEFT_ARROW]) {
			this.moveLeft();
		}
		if (keyboard[keys.D] || keyboard[keys.RIGHT_ARROW]) {
			this.moveRight();
		}

		if (this.currentFrame < this.assets[this._state].animation.length - 1) {
			this.currentFrame += 1;
		} else if (this.assets[this._state].repeat) {
			this.currentFrame = 0;
		}
	};

	Player.prototype.draw = function () {
		page.drawImage(this.assets.image,
					   this.assets.x[this.assets[this._state].animation[this.currentFrame]],
					   this.assets.y[this.assets[this._state].animation[this.currentFrame]],
					   this.assets.w[this.assets[this._state].animation[this.currentFrame]],
					   this.assets.h[this.assets[this._state].animation[this.currentFrame]],
					   this.x, this.y, this.assets.w[this.assets[this._state].animation[this.currentFrame]],
					   this.assets.h[this.assets[this._state].animation[this.currentFrame]]);
	};

	return Player;
});