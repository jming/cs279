// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  sectionsArray: []
};

/*
 * point1 - LatLng (e.g., intersection point)
 * point2 - LatLng (e.g., intersection point)
 * isAccessible - bool of whether section between is accessible
*/
function Section(point1, point2, isAccessible) {
  this.point1 = point1;
  this.point2 = point2;
  this.isAccessible = isAccessible;
}

function initialize() {
  globals.directionsDisplay = new google.maps.DirectionsRenderer();
  globals.directionsService = new google.maps.DirectionsService();

  var mapOptions = {
    center: { lat: 42.370788, lng: -71.117111},
    zoom: 15
  };

  globals.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  globals.directionsDisplay.setMap(globals.map);
}
google.maps.event.addDomListener(window, 'load', initialize);
