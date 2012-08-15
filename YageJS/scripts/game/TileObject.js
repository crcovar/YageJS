define(['utils/EventHandler',
        'render/ArtAssetFactory',
        'game/Entity'],
        function (eventHandler, artAssetFactory, Entity) {
    'use strict';

    var TILE_SIZE = 16;

    TileObject.prototype = new Entity();
    TileObject.prototype.constructor = TileObject;
    function TileObject(params) {
        this._x = params.x,
        this._y = params.y,
        this._width = params.width,
        this._height = params.height;

        this.asset = artAssetFactory.load('tileset');
    }

    TileObject.prototype.getWidth = function () { return this._width * TILE_SIZE; };
    TileObject.prototype.getHeight = function () { return this._height * TILE_SIZE; };

    TileObject.prototype.getBoundingSphere = function () {
    	var a = this.getWidth() / 2,
    		b = this.getHeight() / 2,
    		c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    	return {
    		x: this._x,
    		y: this._y,
    		radius: c
    	};
    };

    TileObject.prototype.draw = function () {
       var i = 0,
           j = 0;

        for (i = 0; i < this._width; i++) {
            var x = (this._x - this.getWidth() / 2) + (TILE_SIZE * i) + (TILE_SIZE / 2);
            for (j = 0; j < this._height; j++) {
                var y = (this._y - this.getHeight() / 2) + (TILE_SIZE * j) + (TILE_SIZE / 2);
                this.asset.draw(x, y);
            }
        }
    };

    return TileObject;
});