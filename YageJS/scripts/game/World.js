define(['render/ArtAssetFactory',
        'utils/AudioAssetFactory',
        'game/TileObjects/Red',
        'game/TileObjects/White'], function (artAssetFactory, audioAssetFactory, Red, White) {
	var request = new XMLHttpRequest(),
		response;

	/**
	 * Defines the size of the current level, worlds operate on the first
	 * quadrant. The camera module will handle the translation to quadrant four
	 * Width and Height of the world must be at least the same as the Screen.
	 */
	function World(game, id) {
		request.open('GET', 'games/' + game + '/' + id + '.json', false);
		request.send();
		if(request.status === 200) {
			response = JSON.parse(request.responseText);
			this.width = response.world.width;
			this.height = response.world.height;
			this.asset = artAssetFactory.load(response.world.asset);
			this.bgMusic = audioAssetFactory.load(response.world.bgMusic);
            this.entities = [];

			this.getWidth = function () { return this.width; };
			this.getHeight = function () { return this.height; };

            for (var key in response) {
                switch (key) {
                    case 'red':
                        for(var i = 0; i < response[key].length; i++) {
                            this.entities.push(new Red(response[key][i]));
                        }
                        break;
                    case 'white':
                        for(var i = 0; i < response[key].length; i++) {
                            this.entities.push(new White(response[key][i]));
                        }
                        break;
                }
            }
		}
	}

	World.prototype.addPlayer = function (player) {
		this.entities.push(player);
	};

	World.prototype.update = function () {
		audioAssetFactory.play(this.bgMusic);

		for (var i=0; i < this.entities.length; i++) {
			this.entities[i].update();
		}

		for (var i = 0; i < this.entities.length; i++) {
			var a = this.entities[i].getBoundingSphere();
			for(var j = i+1; j < this.entities.length; j++) {
				var b = this.entities[j].getBoundingSphere(),
					d1 = Math.sqrt(Math.pow(b.x-a.x, 2) + Math.pow(b.y-a.y, 2)),
					d2 = a.radius + b.radius;
				if (d1 < d2) {
					// Possible collision!
					this.entities[i].collide(this.entities[j]);
					this.entities[j].collide(this.entities[i]);
				}
			}
		}
	};

    World.prototype.draw = function () {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    };

	return World;
});