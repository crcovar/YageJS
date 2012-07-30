define(['utils/EventHandler'], function (eventHandler) {
	var assets = {},
		counts = {},
		audioFactory = {};

	function AudioAsset(id) {
		return new Audio('assets/audio/' + id + '.mp3');
	}

	function AudioAssetRef(id) {
		this.id = id;
	}

	audioFactory.load = function (id) {
		if (typeof assets[id] === 'undefined') {
			assets[id] = new AudioAsset(id);
		}

		if (typeof counts[id] !== 'number') {
			counts[id] = 0;
		}
		counts[id]++;

		return new AudioAssetRef(id);
	};

	audioFactory.play = function(ref) {
		assets[ref.id].play();
	};

	return audioFactory;
});