// yay globals :)
var map;

function initialize() {
  var mapOptions = {
    center: { lat: 42.370788, lng: -71.117111},
    zoom: 15
  };
  window.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  placeMarkers(map,[[42.365517, -71.122176], [42.366523, -71.119212]]);
}
google.maps.event.addDomListener(window, 'load', initialize);


var marker_pos = new google.maps.LatLng(42.364270, -71.124148)

var marker = new google.maps.Marker({
  position: marker_pos,
  map: map,
  title: 'Hello'
});
// console.log(window.map)
