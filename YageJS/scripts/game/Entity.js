define(function () {
	function Entity() {
	}

	Entity.prototype.kill = function() {
		this._state = null;
	};

	Entity.prototype.changeState = function (state) {
		if(this._state !== state) {
			this._state = state;
			return true;
		}
		return false;
	};

	Entity.prototype.getState = function () {
		return this._state;
	};

	Entity.prototype.getBoundingSphere = function () {
		return null;
	};

	Entity.prototype.collide = function (entity) {
		return null;
	};

	Entity.prototype.update = function () {
		return;
	};

	Entity.prototype.draw = function () {
		return;
	};

	return Entity;
});