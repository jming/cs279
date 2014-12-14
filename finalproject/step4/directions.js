// shows draggable route between two points
// also store route in global revisedRoutes array
function showDraggableRoute(start, end) {
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  };

  globals.directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // render route as draggable
      var routeRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        preserveViewport: true,
        polylineOptions: {
          strokeColor: "#000000",
          zIndex: google.maps.Marker.MAX_ZINDEX
        }
      });
      routeRenderer.setMap(globals.map);
      routeRenderer.setDirections(response);

      globals.revisedRoute = {
        start: start,
        end: end,
        route: getEncodedPolyline(routeRenderer.getDirections().routes[0])
      };

      google.maps.event.addListener(routeRenderer, 'directions_changed', function() {
        globals.revisedRoute.route = getEncodedPolyline(routeRenderer.getDirections().routes[0]);
      });
    }
  });
}

// show static route of points on map
function showStaticRoute(points, accessibility) {
  // create line to represent route
  var polyroute = new google.maps.Polyline({
    strokeColor: globals[accessibility],
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
