/*jslint browser: true, maxerr: 50, indent: 4 */
/*global define*/
define(['render/Screen',
        'render/Asset',
        'utils/EventHandler',
        'game/Globals',
        'game/Bullet',
        'game/Entity'], function (page, Asset, EventHandler, Globals, Bullet, Entity) {
	'use strict';
	var keyboard = [];

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
		this.x -= Globals.VELOCITY;
	};

	Player.prototype.moveRight = function () {
		this.x += Globals.VELOCITY;
	};

	Player.prototype.moveUp = function () {
		this.y -= Globals.VELOCITY;
	};

	Player.prototype.moveDown = function () {
		this.y += Globals.VELOCITY;
	};

	Player.prototype.changeState = function (state) {
		if (Entity.prototype.changeState.call(this, state)) {
			this.currentFrame = 0;
		}
	};

	Player.prototype.update = function () {
		if (keyboard[Globals.keys.W] || keyboard[Globals.keys.UP_ARROW]) {
			this.moveUp();
		}
		if (keyboard[Globals.keys.S] || keyboard[Globals.keys.DOWN_ARROW]) {
			this.moveDown();
		}
		if (keyboard[Globals.keys.A] || keyboard[Globals.keys.LEFT_ARROW]) {
			this.moveLeft();
		}
		if (keyboard[Globals.keys.D] || keyboard[Globals.keys.RIGHT_ARROW]) {
			this.moveRight();
		}

		if (keyboard[Globals.keys.R]) {
			Globals.entityFactory.add(new Bullet(this.x, this.y, 0, -1, 'p_standard'));
		}

		if (this.currentFrame < this.assets.info[this._state].animation.length - 1) {
			this.currentFrame += 1;
		} else if (this.assets.info[this._state].repeat) {
			this.currentFrame = 0;
		}
	};

	Player.prototype.draw = function () {
		page.drawImage(this.assets.image,
					   this.assets.info.x[this.assets.info[this._state].animation[this.currentFrame]],
					   this.assets.info.y[this.assets.info[this._state].animation[this.currentFrame]],
					   this.assets.info.w[this.assets.info[this._state].animation[this.currentFrame]],
					   this.assets.info.h[this.assets.info[this._state].animation[this.currentFrame]],
					   this.x, this.y, this.assets.info.w[this.assets.info[this._state].animation[this.currentFrame]],
					   this.assets.info.h[this.assets.info[this._state].animation[this.currentFrame]]);
	};

	return Player;
});