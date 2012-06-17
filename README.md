# YageJS #
Yet Another Game Engine, using JavaScript. Unrelated to my other Yage
repository. Written mostly from scratch to see what could be done using the
HTML5 canvas. This project does share some elements with the Yage project with
the goal being to eventually merge the two.

## scripts ##
All script files are logically grouped into directories for better
organization. The sole exception is `main.js` which provides the launching
point for the engine. 

### game ###
Provides for the game objects, or entities as they are called here.

### lib ###
Directory holds third party libraries needed. For this implementation I'm using
[RequireJS](http://requirejs.org/) and it's domReady plugin to provide
Asynchronous loading of modules, and reduce the complexity of the HTML required
for YageJS.

### render ###
Handles the display of Entities and other assets that need to be drawn onto the
canvas. This directory is the most platform dependent (followed by utils).  

### utils ###
Contains subsystem modules, such as the EventHandler. Modules in this directory
make up the backbone of the engine.

## assets ##
Not currently included in this repository, the location of any art or sound
related assets needed for a game. Each asset should be placed in its own
directory containing the related media file and a json providing information
needed for processing the asset. All asset files need to share the same name.

+ assets/
	+ playerSprite/
		+ playerSprite.png
		+ playerSprite.json
	+ bgMusic/
		+ bgMusic.mp3
		+ bgMusic.json 