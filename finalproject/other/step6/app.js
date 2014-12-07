// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  // PASSED IN FROM STEP 3!!!
  polyroutes: [{"polyroute":"opraG|baqLjB~@","leftGood":false,"rightGood":true,"isSelected":1},{"polyroute":"cmraG|daqLnBbAPL","leftGood":false,"rightGood":false,"isSelected":1},{"polyroute":"airaGngaqLDQHYFQDOLWDIJUNW??B@","leftGood":true,"rightGood":true,"isSelected":1},{"polyroute":"ofraGrbaqLHFh@n@@@DD|CfDt@v@h@j@BD@?LN@@RT??@E","leftGood":true,"rightGood":false,"isSelected":1}],
  // revised routes for draggable (i.e., inaccessible and selected) routes
  revisedRoutes: [],
  // symbols for path objects
  symbols: [google.maps.SymbolPath.CIRCLE, 'M 0,-1 0,1']
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

  // display static accessibility for each polyroute section
  for (var i = 0; i < globals.polyroutes.length; i++) {
    var polyrouteInfo = globals.polyroutes[i];
    var points = google.maps.geometry.encoding.decodePath(polyrouteInfo.polyroute);
    polyrouteInfo.points = points;
    for (var j = 0; j < points.length; j++) {
      bounds.extend(points[j]);
    }

    showStaticRoute(
        polyrouteInfo.points,
        polyrouteInfo.leftGood,
        polyrouteInfo.rightGood,
        polyrouteInfo.isSelected);
  }

  // display draggable route
  var start = globals.polyroutes[0].points[0];
  var ends = globals.polyroutes[globals.polyroutes.length - 1].points;
  var end = ends[ends.length - 1];
  showDraggableRoute(start, end);
  
  globals.map.fitBounds(bounds);

  showLegend();
}
google.maps.event.addDomListener(window, 'load', initialize);

function submitRevisions() {
  $('#instructions-base').hide();
  $('#results-base').show();
  $('#result-div-text').append(JSON.stringify(globals.revisedRoutes));
}

function showLegend() {
    var legendHtml = '<table class="table">';
    legendHtml += '<thead><tr><th>Symbol</th><th>Meaning</th></tr></thead>';
    legendHtml += '<tbody>';
    legendHtml += '<tr><td><svg width="50px" height="30px"><circle cx="25" cy="14" r="5" stroke="'+ globals.green[0] + '" stroke-width="' + (globals.weight - 2).toString() + '" fill="transparent" /></svg></td><td>Left Accessible</td></tr>';
    legendHtml += '<tr><td><svg width="50px" height="10px"><line x1="10" y1="5" x2="40" y2="5" stroke-linecap="round" style="stroke:'+ globals.green[0] + '; stroke-width:' + (globals.weight - 4).toString() + '" /></svg></td><td>Right Accessible</td></tr>';
    legendHtml += '</tbody>';
    legendHtml += '</table>';
    $('#instructions-inner').html(legendHtml);
}
