// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  // PASSED IN FROM STEP 2!!!
  polyroutes: [{"polyroute":"opraG|baqLjB~@","accessibility":"left","isSelected":1},{"polyroute":"cmraG|daqLnBbAPL","accessibility":"right","isSelected":1},{"polyroute":"airaGngaqLDQHYFQDOLWDIJUNW??B@","accessibility":"both","isSelected":1},{"polyroute":"ofraGrbaqLHFh@n@@@DD|CfDt@v@h@j@BD@?LN@@RT??@E","accessibility":"none","isSelected":1}],
  // revised route
  revisedRoute: null
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

  // display static accessibility info
  for (var i = 0; i < globals.polyroutes.length; i++) {
    var polyrouteInfo = globals.polyroutes[i];
    var points = google.maps.geometry.encoding.decodePath(polyrouteInfo.polyroute);
    polyrouteInfo.points = points;
    for (var j = 0; j < points.length; j++) {
      bounds.extend(points[j]);
    }

    showStaticRoute(polyrouteInfo.points, polyrouteInfo.accessibility, polyrouteInfo.isSelected);
  }

  // display draggable route
  var start = globals.polyroutes[0].points[0];
  var ends = globals.polyroutes[globals.polyroutes.length - 1].points;
  var end = ends[ends.length - 1];
  showDraggableRoute(start, end);
  
  globals.map.fitBounds(bounds);
  $('#input-loc').modal('show');
  showLegend();
}
google.maps.event.addDomListener(window, 'load', initialize);

function showLegend() {
    var instructions = [
        {text: 'Left Accessible', color: globals.left},
        {text: 'Right Accessible', color: globals.right},
        {text: 'Both Accessible', color: globals.both},
        {text: 'None Accessible', color: globals.none}
    ];

    var html = '';
    for (var i = 0; i < instructions.length; i++) {
        html += '<div><div style="width:40px;height:40px;border:1px solid #000;background-color:'+ instructions[i].color + '">' + '</div>'+ instructions[i].text + '</div><br />';
    }

    $('#instructions-colors').html(html);
}

function submitRevisions() {
  $('#instructions-base').hide();
  $('#results-base').show();
  $('#result-div-text').append(JSON.stringify(globals.revisedRoute));
}
