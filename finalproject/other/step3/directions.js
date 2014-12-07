globals.start = new google.maps.LatLng(42.370769, -71.117342);
globals.end = new google.maps.LatLng(42.363988, -71.124164);

// returns route of a section
function getRoute(section) {
  var request = {
    origin: section.point1,
    destination: section.point2,
    travelMode: google.maps.TravelMode.WALKING,
    provideRouteAlternatives: true
  };

  globals.directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // NO! below thing is NOT (marker-placement) clickable
      // globals.directionsDisplay.setDirections(response);
      showRoute(response.routes[0], section.isAccessible);
      placeMarker(response.routes[0].legs[0].start_location);
      placeMarker(response.routes[0].legs[0].end_location);
    }
  });
}

// display route on map (and allow clickable!)
function showRoute(route, isAccessible) {
  // create line to represent route
  var polyroute = new google.maps.Polyline({
    strokeColor: isAccessible ? globals.green[0] : globals.red[0],
    strokeWeight: globals.weight
  });

  $(route.legs).each(function(i, leg) {
    $(leg.steps).each(function(j, step) {
      $(step.path).each(function(k, point) {
        polyroute.getPath().push(point);
      })
    })
  });

  polyroute.setMap(globals.map);
  var polyrouteInfo = {
    polyroute: google.maps.geometry.encoding.encodePath(polyroute.getPath()),
    isAccessible: isAccessible,
    isSelected: 0
  };
  globals.polyroutes.push(polyrouteInfo);

  google.maps.event.addListener(polyroute, 'click', function(event) {
    polyrouteInfo.isSelected = 1 - polyrouteInfo.isSelected;
    var color = isAccessible ? globals.green : globals.red;
    polyroute.setOptions({strokeColor: color[polyrouteInfo.isSelected]});
  });
}
