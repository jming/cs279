// globals.start = new google.maps.LatLng(42.370769, -71.117342);
// globals.end = new google.maps.LatLng(42.363988, -71.124164);

// returns route between start and endpoints
function getRoute() {
  var request = {
    origin: globals.start,
    destination: globals.end,
    travelMode: google.maps.TravelMode.WALKING,
    provideRouteAlternatives: true
  };

  globals.directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // NO! below thing is NOT (marker-placement) clickable
      // globals.directionsDisplay.setDirections(response);
      showRoute(response.routes[0]);
      placeMarker(response.routes[0].legs[0].start_location, 'red');
      placeMarker(response.routes[0].legs[0].end_location, 'red');
    }
  });
}

// display route on map (and allow clickable!)
function showRoute(route) {
  // create line to represent route
  var polyroute = new google.maps.Polyline({
    strokeColor: '#3366FF',
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

  // let person place marker at every point in path
  google.maps.event.addListener(polyroute, 'click', function(event) {
    placeMarker(event.latLng);
  });
}
