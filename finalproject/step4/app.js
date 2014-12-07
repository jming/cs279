// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  // PASSED IN FROM STEP 2!!!
  // each polyroute contains a route and an accessibility string tag
  polyroutes: [
    {
        "polyroute":"opraG|baqLjB~@",
        "accessibility":"left"
    },
    {
        "polyroute":"cmraG|daqLnBbAPL",
        "accessibility":"right"
    },
    {
        "polyroute":"airaGngaqLDQHYFQDOLWDIJUNW??B@",
        "accessibility":"both"
    },
    {
        "polyroute":"ofraGrbaqLHFh@n@@@DD|CfDt@v@h@j@BD@?LN@@RT??@E",
        "accessibility":"none"
    }
  ],
  // PASSED IN FROM STEP 2!!!
  // each intersection contains a location and boolean of cross-ability
  intersections: [
    {
        loc: new google.maps.LatLng(42.370260407036795,-71.11774742603302),
        crossable: true
    },
    {
        loc: new google.maps.LatLng(42.36960930626074,-71.11815725693282),
        crossable: false
    },
    {
        loc: new google.maps.LatLng(42.36919824433562,-71.117382645607),
        crossable: true
    }
  ],
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

    showStaticRoute(polyrouteInfo.points, polyrouteInfo.accessibility);
  }

  // display draggable route
  var start = globals.polyroutes[0].points[0];
  var ends = globals.polyroutes[globals.polyroutes.length - 1].points;
  var end = ends[ends.length - 1];
  showDraggableRoute(start, end);
  
  for (var i = 0; i < globals.intersections.length; i++) {
      var intersection = globals.intersections[i];
      addIntersectionInfo(intersection.loc, intersection.crossable);
  }

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
