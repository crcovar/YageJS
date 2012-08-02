define(['utils/EventHandler', 'game/TileObject'], 
function (eventHandler, TileObject) {
    'use strict';
    
    function Red(params) {
        var red = new TileObject(params);
        red.asset.changeAnimation('red');
        
        return red;
    }
    
    return Red;
});