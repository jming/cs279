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

		if (markers_list[i].highlight_start) {
			displayStreetview(map, marker_pos);
			$('#instruction-pos').append('(' + marker_pos.lat().toFixed(4) + ', ' + marker_pos.lng().toFixed(4) + ')');
		}
		

		// google.maps.event.addListener(marker, 'click', function(event) {
			// console.log(event);
			// displayStreetview(map, lat, lng);
		// });
	}
}

function displayStreetview(map, pos) {
	var panoramaOptions = {
		position: pos,
		pov: {
			heading: 34,
			pitch: 10
		}
	};
	var panorama = new google.maps.StreetViewPanorama(
		document.getElementById('street-canvas'), panoramaOptions);

	map.setStreetView(panorama);

}

function submitAccessibility() {

	$('#instructions-base').hide();
	$('#result-base').show();

	var checked_array = [];

	$('.checkbox :checked').each(function() {
		checked_array.push($(this).val());
	});

	checked_array.push($('#instruction-other-pos').val());
	checked_array.push($('#instruction-other-neg').val());

	$('#result-div-text').append($('#instruction-pos').text()).append('<br>');
	$('#result-div-text').append(checked_array.toString()).append('<br>');
	$('#result-div-text').append($('.radio :checked').val()).append('<br>');
}


