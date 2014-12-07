globals.start = new google.maps.LatLng(42.370769, -71.117342);
globals.end = new google.maps.LatLng(42.363988, -71.124164);

// shows draggable route between two points
// also store route in global revisedRoutes array
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
        draggable: true,
        preserveViewport: true
      });
      routeRenderer.setMap(globals.map);
      routeRenderer.setDirections(response);

      globals.revisedRoutes.push({
        start: start,
        end: end,
        route: getEncodedPolyline(routeRenderer.getDirections().routes[0])
      });

      google.maps.event.addListener(routeRenderer, 'directions_changed', function() {
        // find index in revisedRoutes where this is stored
        for (var i = 0; i < globals.revisedRoutes.length; i++) {
          var route = globals.revisedRoutes[i];
          // found it - update directions
          if (route.start == start && route.end == end) {
            route.route = getEncodedPolyline(routeRenderer.getDirections().routes[0]);
          }
        }
      });
    }
  });
}

// show static route of points on map
function showStaticRoute(points, isAccessible, isSelected) {
  // create line to represent route
  var polyroute = new google.maps.Polyline({
    strokeColor: isAccessible ? globals.green[isSelected] : globals.red[isSelected],
    strokeWeight: globals.weight,
    path: points
  });

  polyroute.setMap(globals.map);
}

// return encoded polyline from a route
function getEncodedPolyline(route) {
  var points = [];

  $(route.legs).each(function(i, leg) {
    $(leg.steps).each(function(j, step) {
      $(step.path).each(function(k, point) {
        points.push(point);
      })
    })
  });

  // var polyline = new google.maps.Polyline({path: points});
  return google.maps.geometry.encoding.encodePath(points);
}