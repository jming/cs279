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

Section.prototype.toString = function sectionToString() {
  return '[' + this.point1.toString() 
    + ';' + this.point2.toString() 
    + ';' + this.isAccessible + ']';
}

// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  // PASSED IN FROM STEP 3!!!
  polyroutes: [{"polyroute":"opraG|baqLjB~@nBbAPL","isAccessible":true,"isSelected":0},{"polyroute":"airaGngaqLDQHYFQDOLWDIJUNW??B@","isAccessible":true,"isSelected":0},{"polyroute":"ofraGrbaqLHFh@n@@@DD|CfDt@v@h@j@BD@?LN@@RT??@E","isAccessible":false,"isSelected":0}],
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
    var points = google.maps.geometry.encoding.decodePath(globals.polyroutes[i].polyroute);
    for (var j = 0; j < points.length; j++) {
      bounds.extend(points[j]);
    }
  }
  globals.map.fitBounds(bounds);
}
google.maps.event.addDomListener(window, 'load', initialize);

function submitRoute() {

  $('#instructions-base').hide();
  $('#results-base').show();

  $('#result-div-text').append(globals.sectionsArray.toString());

}
