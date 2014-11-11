// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  // PASSED IN FROM STEP 3!!!
  polyroutes: [{"polyroute":"opraG|baqLjB~@nBbAPL","isAccessible":true,"isSelected":1},{"polyroute":"airaGngaqLDQHYFQDOLWDIJUNW??B@","isAccessible":true,"isSelected":1},{"polyroute":"ofraGrbaqLHFh@n@@@DD|CfDt@v@h@j@BD@?LN@@RT??@E","isAccessible":false,"isSelected":1}],
  // revised routes for draggable (i.e., inaccessible and selected) routes
  revisedRoutes: []
};

function initialize() {
  globals.directionsDisplay = new google.maps.DirectionsRenderer();
  globals.directionsService = new google.maps.DirectionsService();

  var mapOptions = {
    center: { lat: 42.370788, lng: -71.117111},
    zoom: 15
  };

  globals.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var bounds = new google.maps.LatLngBounds();
  globals.directionsDisplay.setMap(globals.map);
  for (var i = 0; i < globals.polyroutes.length; i++) {
    var polyrouteInfo = globals.polyroutes[i];
    var points = google.maps.geometry.encoding.decodePath(polyrouteInfo.polyroute);
    polyrouteInfo.points = points;
    for (var j = 0; j < points.length; j++) {
      bounds.extend(points[j]);
    }

    showRouteInfo(polyrouteInfo);
  }
  globals.map.fitBounds(bounds);
}
google.maps.event.addDomListener(window, 'load', initialize);

function submitRevisions() {
  $('#instructions-base').hide();
  $('#results-base').show();
  $('#result-div-text').append(JSON.stringify(globals.revisedRoutes));
}