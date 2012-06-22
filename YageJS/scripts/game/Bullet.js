/*jslint browser: true, maxerr: 50, indent: 4 */
/*global define*/
define(['render/Screen',
        'game/YageJS',
        'render/ArtAsset2d',
        'game/Entity'], function (page, Globals, Asset, Entity) {
	'use strict';

	Bullet.prototype = new Entity();
	Bullet.prototype.constructor = Bullet;
	function Bullet(x, y, vx, vy, type) {
		this._x = x;
		this._y = y;

		this._vectorX = vx;
		this._vectorY = vy;

		var _type = type;
		this.changeState(type);
		this.getType = function () {
			return _type;
		};
	}

	Bullet.prototype.asset = new Asset('bullets');

	Bullet.prototype.update = function () {
		if (this.getState() !== null) {
			if (this._vectorX !== 0) {
				this._x += Globals.VELOCITY + this._vectorX;
			}
			if (this._vectorY !== 0) {
				this._y += 8 + this._vectorY;
			}
		}

		if (this._x < 0 || this._x > page.width || this._y < 0 || this._y > page.height) {
			this.kill();
		}
	};

	Bullet.prototype.draw = function () {
		if (this.getState() === null) {
			return;
		}

		page.drawImage(this.asset.image,
					   this.asset.x[this.asset[this.type]],
					   this.asset.y[this.asset[this.type]],
					   this.asset.w[this.asset[this.type]],
					   this.asset.h[this.asset[this.type]],
					   this._x, this._y, this.asset.w[this.asset[this.type]],
					   this.asset.h[this.asset[this.type]]);
	};

	return Bullet;
});