// place a marker at given location (LatLng object)
function placeMarker(location, color) {
	var marker = new google.maps.Marker({
		position: location,
		map: globals.map,
		title: 'Intersection ' + globals.markersArray.length.toString(),
		clickable: true,
        icon: 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png'
	});

	globals.markersArray.push(marker);

	// let person also remove marker if desired
	google.maps.event.addListener(marker, 'rightclick', function(event) {
		marker.setMap(null);
		globals.markersArray[globals.markersArray.indexOf(marker)] = null;
	});
}

/** UNUSED
function placeMarkers(map, markers_list) {

	// console.log(markers_list.length);

	for (var i=0; i < markers_list.length; i++) {
		// console.log(markers_list[i]);
		var marker_pos = new google.maps.LatLng(
			markers_list[i].lat, markers_list[i].lng);

		var icon_color = (markers_list[i].highlight) ? '' : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

		var marker = new google.maps.Marker({
			position: marker_pos,
			map: map,
			title: 'Intersection ' + i.toString(),
			clickable: true,
			icon: icon_color

			// http://maps.google.com/mapfiles/ms/icons/blue-dot.png
			// http://maps.google.com/mapfiles/ms/icons/red-dot.png
			// http://maps.google.com/mapfiles/ms/icons/purple-dot.png
			// http://maps.google.com/mapfiles/ms/icons/yellow-dot.png
			// http://maps.google.com/mapfiles/ms/icons/green-dot.png
		});

		google.maps.event.addListener(marker, 'click', function(event) {
			console.log(event);
		});
	}
}
**/
