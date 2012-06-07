define(function () {
	function ArtAsset2d(id) {
		var request = new XMLHttpRequest(),
			that = {};

		request.open("GET", 'assets/' + id + '/' + id + '.json', false);
		request.send();
		that = JSON.parse(request.responseText);

		that.image = new Image();
		that.image.src = 'assets/' + id + '/' + id + '.png';


		return that;
	}

	return ArtAsset2d;
});