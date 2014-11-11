// place a marker at given location (LatLng object)
function placeMarker(location) {
	var marker = new google.maps.Marker({
		position: location,
		map: globals.map,
		// title: 'Intersection ' + globals.markersArray.length.toString(),
		clickable: true
	});
}
