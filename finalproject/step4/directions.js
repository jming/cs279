globals.start = new google.maps.LatLng(42.370769, -71.117342);
globals.end = new google.maps.LatLng(42.363988, -71.124164);

// shows draggable route between two points
function showDraggableRoute(start, end) {
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING,
  };

  globals.directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // render route as draggable
      var routeRenderer = new google.maps.DirectionsRenderer({
        draggable: true
      });
      routeRenderer.setMap(globals.map);
      routeRenderer.setDirections(response);
    }
  });
}

// show static route of points on map
function showStaticRoute(points, isAccessible, isSelected) {
  // create line to represent route
  var polyroute = new google.maps.Polyline({
    strokeColor: isAccessible ? globals.green[0] : globals.red[0],
    strokeWeight: globals.weight,
    path: points
  });

  polyroute.setMap(globals.map);
}