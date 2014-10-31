function placeMarkers(map, markers_list) {

	// console.log(markers_list.length);

	for (var i=0; i < markers_list.length; i++) {
		// console.log(markers_list[i]);
		var marker_pos = new google.maps.LatLng(
			markers_list[i][0], markers_list[i][1]);

		var marker = new google.maps.Marker({
			position: marker_pos,
			map: map,
			title: 'Hello'
		});
	}


}


