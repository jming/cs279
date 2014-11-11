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
};


// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  polyroutes: [],
  sectionsArray: [
    new Section(
      new google.maps.LatLng(42.37079689999999, -71.11742509999999),
      new google.maps.LatLng(42.370265539907415, -71.11774804344628),
      true),
    new Section(
      new google.maps.LatLng(42.370265539907415, -71.11774804344628),
      new google.maps.LatLng(42.3696056730474, -71.11813688278198),
      false),
    new Section(
      new google.maps.LatLng(42.3696056730474, -71.11813688278198),
      new google.maps.LatLng(42.369204585658785, -71.1173837184906),
      true),
    new Section(
      new google.maps.LatLng(42.369204585658785, -71.1173837184906),
      new google.maps.LatLng(42.367409312859884, -71.11924334133374),
      false)//,
    // new Section(
    //   new google.maps.LatLng(42.367409312859884, -71.11924334133374),
    //   new google.maps.LatLng(42.3637026, -71.12412039999998),
    //   true)
  ]
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
  for (var i = 0; i < globals.sectionsArray.length; i++) {
    showRouteAccessibility(globals.sectionsArray[i]);
    bounds.extend(globals.sectionsArray[i].point1);
    bounds.extend(globals.sectionsArray[i].point2);
  }
  globals.map.fitBounds(bounds);
}
google.maps.event.addDomListener(window, 'load', initialize);

function submitRoute() {

  $('#instructions-base').hide();
  $('#results-base').show();

  // $('#result-div-text').append(globals.sectionsArray.toString());
  $('#result-div-text').append(JSON.stringify(globals.polyroutes));
}
