define(['utils/EventHandler', 'game/TileObject'], 
function (eventHandler, TileObject) {
    'use strict';
    
    function White(params) {
        var white = new TileObject(params);
        white.asset.changeAnimation('white');
        
        return white;
    }
    
    return White;
});