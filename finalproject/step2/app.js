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
  globals.directionsDisplay = new google.maps.DirectionsRenderer();
  globals.directionsService = new google.maps.DirectionsService();

  var center_pos = new google.maps.LatLng(42.370788, -71.117111);

  var mapOptions = {
    center: center_pos,
    zoom: 15
  };

  globals.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  globals.directionsDisplay.setMap(globals.map);

  // placeMarkers(globals.map, [
  //   new MarkerInfo(42.365517, -71.122176, true, true),
  //   new MarkerInfo(42.366523, -71.119212, false, false)
  // ]);

  $('#input-loc').modal('show');
  getRoute();


}
google.maps.event.addDomListener(window, 'load', initialize);

// console.log(window.map)

function updateMap() {
  $('#input-loc').modal('hide');
  var input_loc_text = $('#input-loc-text').val().split(';');

  for (var i=0; i<input_loc_text.length; i++) {
    input_loc_text[i] = input_loc_text[i].replace('(','').replace(')','').split(',');
  }
  // (42.365517, -71.122176);(42.366523, -71.119212)
  // var input_loc_parsed = ('[' + input_loc_text + ']');
  console.log(input_loc_text);
  placeMarkers(globals.map, [
    new MarkerInfo(input_loc_text[0][0], input_loc_text[0][1], true, true),
    new MarkerInfo(input_loc_text[1][0], input_loc_text[1][1], false, false)
  ]);
}