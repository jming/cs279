// yay globals :)
var globals = {
  map: null,
  start: new google.maps.LatLng(42.370769, -71.117342),
  // end: new google.maps.LatLng(42.363988, -71.124164),
  end: new google.maps.LatLng(42.380216, -71.125039),
  directionsDisplay: null,
  directionsService: null,
  markersArray: []
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

  globals.directionsDisplay.setMap(globals.map);

  $('#input-loc').modal('show');

  getRoute();
}
google.maps.event.addDomListener(window, 'load', initialize);

function showLatLngs() {
  var latLngs = [];
  var endpoint = globals.markersArray[1];
  for (var i = 0; i < globals.markersArray.length; i++) {
    if (globals.markersArray[i] && i != 1) {
      latLngs.push(globals.markersArray[i].getPosition());
    }
  }

  latLngs.push(endpoint.getPosition());

  $('#instructions-base').hide();
  $('#result-base').show();

  $('#result-div-text').append(latLngs.toString());
};
