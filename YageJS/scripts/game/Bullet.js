define(['render/Screen', 'render/Asset', 'game/Entity', 'game/Globals'], function (page, Asset, Entity, Globals) {
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
				this._y += Globals.VELOCITY + this._vectorY;
			}
		}

		if (this._x < 0 || this._x > page.width || this._y < 0 || this._y > page.height) {
			this.kill();
		}
	};

	Bullet.prototype.draw = function() {
		if(this.getState() === null) {
			return;
		}

		page.drawImage(this.asset.image,
					   this.asset.info.x[this.asset.info[this.type]],
					   this.asset.info.y[this.asset.info[this.type]],
					   this.asset.info.w[this.asset.info[this.type]],
					   this.asset.info.h[this.asset.info[this.type]],
					   this._x, this._y, this.asset.info.w[this.asset.info[this.type]],
					   this.asset.info.h[this.asset.info[this.type]]);
	};

	return Bullet;
});