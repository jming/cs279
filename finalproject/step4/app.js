// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  // hackhackhack
  rawIntersections: [[42.37079689999999,-71.11742509999999],[42.37141750373189,-71.1170419238029],[42.37160825202197,-71.11691749632337],[42.37234230976074,-71.11657745422332],[42.37269216025804,-71.11642654188836],[42.3728851637608,-71.1171068236419],[42.37312344945484,-71.11790396926949],[42.37334668042175,-71.11856989860536]],
  rawCrossability: [true, true, false, true, true, false, true, true],
  // rawAccessibility: ["left", "both", "left", "right", "both", "both", "right"],
  // PASSED IN FROM STEP 2!!! but not. derp.
  // each polyroute contains a route and an accessibility string tag
  polyroutes: [
    {
      polyroute: "opraG|baqLYQEAYOaAi@",
      accessibility: "left"
    },
    {
      polyroute: "ktraGn`aqLc@W",
      accessibility: "both"
    },
    {
      polyroute: "ouraGv_aqLsCcA",
      accessibility: "left"
    },
    {
      polyroute: "czraGr}`qLgA_@",
      accessibility: "right"
    },
    {
      polyroute: "k|raGr|`qLOz@AHSfA",
      accessibility: "both"
    },
    {
      polyroute: "q}raG`aaqLOt@Q|@Kd@",
      accessibility: "both"
    },
    {
      polyroute: "__saGzeaqLWzAGTCDGJAB",
      accessibility: "right"
    }
  ],
  // PASSED IN FROM STEP 2!!! but not. derp.
  // each intersection contains a location and boolean of cross-ability
  intersections: [],
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

  intersectionLoad(globals.rawIntersections);
  // polyrouteLoad(globals.rawIntersections);

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
    if (matchesInfo[i].color === globals.none) {
      html += 'Uncolored sections';
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

function intersectionLoad(intersections) {
  for (var i = 0; i < intersections.length; i++) {
    var intersection = intersections[i];
    var crossable = globals.rawCrossability[i];
    globals.intersections.push({
      loc: new google.maps.LatLng(intersection[0], intersection[1]),
      crossable: crossable
    });
  }
}

// function polyrouteLoad(intersections, callback) {
//   for (var i = 0; i < intersections.length - 1; i++) {
//     var start = intersections[i];
//     var end = intersections[i + 1];

//     var request = {
//       origin: new google.maps.LatLng(start[0], start[1]),
//       destination: new google.maps.LatLng(end[0], end[1]),
//       travelMode: google.maps.TravelMode.WALKING
//     };

//     var accessibility = globals.rawAccessibility[i];

//     globals.directionsService.route(request, function(response, status) {
//       if (status == google.maps.DirectionsStatus.OK) {
//         var newPolyroute = {
//           polyroute: getEncodedPolyline(response.routes[0]),
//           accessibility: accessibility
//         };
//         globals.polyroutes.push(newPolyroute);
//       }

//       callback();
//     });
//   }
// }

// function doRouteMagic() {
//   // display static accessibility info and update bounds
//   var bounds = new google.maps.LatLngBounds();
//   for (var i = 0; i < globals.polyroutes.length; i++) {
//     var polyrouteInfo = globals.polyroutes[i];
//     var points = google.maps.geometry.encoding.decodePath(polyrouteInfo.polyroute);
//     polyrouteInfo.points = points;
//     for (var j = 0; j < points.length; j++) {
//       bounds.extend(points[j]);
//     }

//     showStaticRoute(polyrouteInfo.points, polyrouteInfo.accessibility);
//   }
//   globals.map.fitBounds(bounds);

//   // display draggable route
//   var start = globals.polyroutes[0].points[0];
//   var endpoints = globals.polyroutes[globals.polyroutes.length - 1].points;
//   var end = endpoints[endpoints.length - 1];
//   showDraggableRoute(start, end);
  
//   // display intersection information
//   for (var i = 0; i < globals.intersections.length; i++) {
//       var intersection = globals.intersections[i];
//       addIntersectionInfo(intersection.loc, intersection.crossable);
//   }
// }