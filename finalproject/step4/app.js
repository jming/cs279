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

  globals.directionsDisplay.setMap(globals.map);

  // display static accessibility info and update bounds
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < globals.polyroutes.length; i++) {
    var polyrouteInfo = globals.polyroutes[i];
    var points = google.maps.geometry.encoding.decodePath(polyrouteInfo.polyroute);
    polyrouteInfo.points = points;
    for (var j = 0; j < points.length; j++) {
      bounds.extend(points[j]);
    }

    showStaticRoute(polyrouteInfo.points, polyrouteInfo.accessibility);
  }
  globals.map.fitBounds(bounds);

  // display draggable route
  var start = globals.polyroutes[0].points[0];
  var endpoints = globals.polyroutes[globals.polyroutes.length - 1].points;
  var end = endpoints[endpoints.length - 1];
  showDraggableRoute(start, end);
  
  // display intersection information
  for (var i = 0; i < globals.intersections.length; i++) {
      var intersection = globals.intersections[i];
      addIntersectionInfo(intersection.loc, intersection.crossable);
  }

  $('#input-loc').modal('show');
  // showStreetLegend();
  // showIntersectionLegend();
  showMatchLegend();
}
google.maps.event.addDomListener(window, 'load', initialize);

// function showStreetLegend() {
//   var instructions = [
//     {text: 'Left Accessible', color: globals.left},
//     {text: 'Right Accessible', color: globals.right},
//     {text: 'Both Accessible', color: globals.both},
//     {text: 'None Accessible', color: globals.none}
//   ];

//   var html = '<tr><th>Color</th><th>Meaning</th></tr>';
//   for (var i = 0; i < instructions.length; i++) {
//     html += '<tr><td><div class="legend-key" style="background-color:'+ instructions[i].color + '"></div></td>' + '<td>'+ instructions[i].text + '</td></tr>';
//   }

//   $('#instructions-street-table').html(html);
// }

// function showIntersectionLegend() {
//   var instructions = [
//     {text: 'Can cross', color: globals.both},
//     {text: 'Cannot cross', color: globals.none}
//   ];

//   var html = '<tr><th>Color</th><th>Meaning</th></tr>';
//   for (var i = 0; i < instructions.length; i++) {
//     html += '<tr><td><svg xmlns="http://www.w3.org/2000/svg" style="height:50px;width:50px;"><circle cx="25" cy="25" r="20" fill="'+ instructions[i].color+ '" /></svg></td>' + '<td>'+ instructions[i].text + '</td></tr>';
//   }

//   $('#instructions-int-table').html(html);
// }

function showMatchLegend() {
  var matchesInfo = [
    {color: globals.left, matches: [globals.both, globals.left]},
    {color: globals.right, matches: [globals.both, globals.right]},
    {color: globals.both, matches: [globals.both, globals.left, globals.right]},
    {color: globals.none, matches: []}
  ];
  var html = '<tr><th>Color</th><th>Matches with</th></tr>';
  for (var i = 0; i < matchesInfo.length; i++) {
    html += '<tr><td><div class="legend-key legend-square" style="background-color:' + matchesInfo[i].color + '"></div></td>';
    html += '<td>';
    for (var j = 0; j < matchesInfo[i].matches.length; j++) {
      var match = matchesInfo[i].matches[j];
      html += '<div class="legend-key legend-square" style="background-color:' + match + '"></div>';
    }
    html += '</td></tr>';
  }

  $('#instructions-match-table').html(html);
  $('#legend-match-table').html(html);
}

function submitRevisions() {
  $('#instructions-base').hide();
  $('#results-base').show();
  $('#result-div-text').append(JSON.stringify(globals.revisedRoute));
}
