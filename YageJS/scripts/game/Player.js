/*jslint browser: true, maxerr: 50, indent: 4 */
/*global define*/
define(['render/Screen',
        'render/ArtAssetFactory',
        'utils/EventHandler',
        'utils/keyCodes',
        'game/Entity'], function (page, artAssetFactory, EventHandler, keys, Entity) {
	'use strict';
	var keyboard = [],
		VELOCITY = 8;

	Player.prototype = new Entity();
	Player.prototype.constructor = Player;
	function Player(id) {
		this.id = id;

		this.x = 20;
		this.y = 20;

		this.assets = artAssetFactory.load(id);
		this.changeState('idle');

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
		this.y += VELOCITY;
	};

	Player.prototype.moveDown = function () {
		this.y -= VELOCITY;
	};

	Player.prototype.changeState = function (state) {
		Entity.prototype.changeState.call(this, state);
		this.assets.changeAnimation(state);
	};

	Player.prototype.getBoundingBox = function () {
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
	};

	Player.prototype.draw = function () {
		this.assets.draw(this.x, this.y);
	};

	return Player;
});