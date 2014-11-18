// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  sections: [{"loc":{"k":42.369594,"B":-71.11811599999999},"type":"int","obstacles":[]},{"loc":{"k":42.369594,"B":-71.11811599999999},"type":"lud","obstacles":[]},{"loc":{"k":42.369513,"B":-71.11790100000002},"type":"mid","obstacles":[{"loc":{"k":42.369513,"B":-71.11790100000002},"type":"obstacle","side":"left"},{"loc":{"k":42.369466,"B":-71.117793},"type":"obstacle","side":"right"}]},{"loc":{"k":42.369298,"B":-71.11749299999997},"type":"int","obstacles":[]},{"loc":{"k":42.369298,"B":-71.11749299999997},"type":"lud","obstacles":[]},{"loc":{"k":42.369298,"B":-71.11749299999997},"type":"int","obstacles":[]},{"loc":{"k":42.369298,"B":-71.11749299999997},"type":"lud","obstacles":[]}]
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
  /*
  for (var i = 0; i < globals.sectionsArray.length; i++) {
    showRouteAccessibility(globals.sectionsArray[i]);
    bounds.extend(globals.sectionsArray[i].point1);
    bounds.extend(globals.sectionsArray[i].point2);
  }
  globals.map.fitBounds(bounds);
  */

  showSectionMarkers(globals.sections);
}
google.maps.event.addDomListener(window, 'load', initialize);

function submitRoute() {

  $('#instructions-base').hide();
  $('#results-base').show();

  // $('#result-div-text').append(globals.sectionsArray.toString());
  $('#result-div-text').append(JSON.stringify(globals.polyroutes));
}
