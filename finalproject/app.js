// yay globals :)
var map;

function MarkerInfo (lat,lng,highlight) {
  this.lat = lat;
  this.lng = lng;
  this.highlight = highlight;
} 

function initialize() {
  var mapOptions = {
    center: { lat: 42.370788, lng: -71.117111},
    zoom: 15
  };
  window.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  placeMarkers(map,[
    new MarkerInfo(42.365517, -71.122176, true),
    new MarkerInfo(42.366523, -71.119212, false)]);
}
google.maps.event.addDomListener(window, 'load', initialize);

// console.log(window.map)
