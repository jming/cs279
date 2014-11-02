// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  markersArray: []
};

function MarkerInfo (lat,lng,highlight) {
  this.lat = lat;
  this.lng = lng;
  this.highlight = highlight;
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

  getRoute();
}
google.maps.event.addDomListener(window, 'load', initialize);

function showLatLngs() {
  var latLngs = [];
  for (var i = 0; i < globals.markersArray.length; i++) {
    if (globals.markersArray[i]) {
      latLngs.push(globals.markersArray[i].getPosition());
    }
  }

  alert(latLngs);
};
// console.log(window.map)
