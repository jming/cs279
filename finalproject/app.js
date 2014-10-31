function initialize() {
  var mapOptions = {
    center: { lat: 42.370788, lng: -71.117111},
    zoom: 15
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);