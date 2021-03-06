// globals.start = new google.maps.LatLng(42.370769, -71.117342);
// globals.end = new google.maps.LatLng(42.363988, -71.124164);

globals.start = new google.maps.LatLng(42.37079689999999, -71.11742509999999);
globals.end = new google.maps.LatLng(42.3801904, -71.12509539999996);


// returns route between start and endpoints
function getRoute(start, end, color) {
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING,
    provideRouteAlternatives: true
  };

  globals.directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // NO! below thing is NOT (marker-placement) clickable
      // globals.directionsDisplay.setDirections(response);
      showRoute(response.routes[0], color);
      // placeMarker(response.routes[0].legs[0].start_location);
      // placeMarker(response.routes[0].legs[0].end_location);
    }
  });
}

// display route on map
function showRoute(route, color) {
  // create line to represent route
  var polyroute = new google.maps.Polyline({
    strokeColor: color,
    strokeWeight: 7
  });

  // for ensuring correct bounds/zoom level
  var bounds = new google.maps.LatLngBounds();

  $(route.legs).each(function(i, leg) {
    $(leg.steps).each(function(j, step) {
      $(step.path).each(function(k, point) {
        polyroute.getPath().push(point);
        bounds.extend(point);
      })
    })
  });

  globals.map.fitBounds(bounds);
  polyroute.setMap(globals.map);
}
