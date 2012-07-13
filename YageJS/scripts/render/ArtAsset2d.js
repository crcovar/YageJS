define(['render/Screen'], function (screen) {
	function ArtAsset2d(id) {
		var request = new XMLHttpRequest(),
			that = {};

		request.open("GET", 'assets/' + id + '/' + id + '.json', false);
		request.send();
		that = JSON.parse(request.responseText);

		that.image = new Image();
		that.image.src = 'assets/' + id + '/' + id + '.png';

		that.state = 'default';
		that.currentFrame = 0;

		that.changeState = function (state) {
			if(this.state !== state) {
				this.state = state;
				this.currentFrame = 0;
			}
		};

		that.getSize = function () {
			return {
				w: this.w[this[this.state].animation[this.currentFrame]],
				h: this.h[this[this.state].animation[this.currentFrame]]
			};
		};

		/**
		 * draws the asset to the screen, update the frame
		 * @param x view coordinate
		 * @param y view coordinate
		 */
		that.draw = function (x, y) {
			screen.drawImage(this.image,
					this.x[this[this.state].animation[this.currentFrame]],
					this.y[this[this.state].animation[this.currentFrame]],
					this.w[this[this.state].animation[this.currentFrame]],
					this.h[this[this.state].animation[this.currentFrame]],
					x, y,
					this.w[this[this.state].animation[this.currentFrame]],
					this.h[this[this.state].animation[this.currentFrame]]);

			if (this.currentFrame < this[this.state].animation.length - 1) {
				this.currentFrame += 1;
			} else if (this[this.state].repeat) {
				this.currentFrame = 0;
			}
		};

		return that;
	}

	return ArtAsset2d;
});