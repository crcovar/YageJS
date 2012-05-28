define(function () {
	function Asset(id) {
		this.image = new Image();
		this.image.src = 'assets/' + id + '/' + id + '.png';

		var request = new XMLHttpRequest();
		request.open("GET", 'assets/' + id + '/' + id + '.json', false);
		request.send();
		this.info = JSON.parse(request.responseText);
	}

	return Asset;
});