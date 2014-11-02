// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  markersArray: []
};

function MarkerInfo (lat,lng,highlight,highlight_start) {
  this.lat = lat;
  this.lng = lng;
  this.highlight = highlight;
  this.highlight_start = highlight_start;
}

function initialize() {
  // globals.directionsDisplay = new google.maps.DirectionsRenderer();
  // globals.directionsService = new google.maps.DirectionsService();

  var center_pos = new google.maps.LatLng(42.370788, -71.117111);

  var mapOptions = {
    center: center_pos,
    zoom: 15
  };

  globals.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // globals.directionsDisplay.setMap(globals.map);

  placeMarkers(globals.map, [
    new MarkerInfo(42.365517, -71.122176, true, true),
    new MarkerInfo(42.366523, -71.119212, false, false)
  ]);


}
google.maps.event.addDomListener(window, 'load', initialize);

// console.log(window.map)