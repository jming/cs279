// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  markersArray: [],
  sections: [],
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
  intersections: [],
  start_intersection: 0,
  end_intersection: 0,
  curr_intersection: 0,
  crossability: []
};

function MarkerInfo (lat,lng,highlight,highlight_start) {
  this.lat = lat;
  this.lng = lng;
  this.highlight = highlight;
  this.highlight_start = highlight_start;
}

function initialize() {
  globals.directionsDisplay = new google.maps.DirectionsRenderer();
  globals.directionsService = new google.maps.DirectionsService();

  var center_pos = new google.maps.LatLng(42.370788, -71.117111);

  var mapOptions = {
    center: center_pos,
    zoom: 15
  };

  globals.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  globals.directionsDisplay.setMap(globals.map);

  // placeMarkers(globals.map, [
  //   new MarkerInfo(42.365517, -71.122176, true, true),
  //   new MarkerInfo(42.366523, -71.119212, false, false)
  // ]);

  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < globals.polyroutes.length; i++) {
    var polyrouteInfo = globals.polyroutes[i];
    var points = google.maps.geometry.encoding.decodePath(polyrouteInfo.polyroute);
    polyrouteInfo.points = points;
    for (var j = 0; j < points.length; j++) {
      bounds.extend(points[j]);
    }

    showStaticRoute(polyrouteInfo.points);
  }

  intersectionLoad([
    [42.37079689999999, -71.11742509999999],
    [42.37029797834395, -71.1177251227291],
    [42.36967701243323, -71.1181046962738],
    [42.3692140976423, -71.11737728118896],
    [42.36744837853081, -71.1192365357133],
    [42.36730846620258, -71.11907583328372],
    [42.3637026, -71.12412039999998]]);

  globals.map.fitBounds(bounds);
  $('#input-loc').modal('show');
  // sectionTypeSelect(center_pos);
  // updateMap();

}
google.maps.event.addDomListener(window, 'load', initialize);

// console.log(window.map)

function updateMap() {

  $('#input-loc').modal('hide');
  $('#instructions-modal').modal('show');

  var input_loc_text = $('#input-loc-text').val().split(';');

  // for (var i=0; i<input_loc_text.length; i++) {
  //   input_loc_text[i] = input_loc_text[i].replace('(','').replace(')','').split(',');
  // }
  // (42.365517, -71.122176);(42.366523, -71.119212)
  // (42.370265671066136, -71.11774476913672);(42.3692140976423, -71.11737728118896)
  // var input_loc_parsed = ('[' + input_loc_text + ']');
  // console.log(input_loc_text);
  // placeMarkers(globals.map, [
  //   new MarkerInfo(input_loc_text[0][0], input_loc_text[0][1], true, true),
  //   new MarkerInfo(input_loc_text[1][0], input_loc_text[1][1], false, false)
  // ]);

  var start_intersection = globals.intersections[input_loc_text[0]]
  var end_intersection = globals.intersections[input_loc_text[1]]

  placeMarkers(globals.map, [
    new MarkerInfo(start_intersection[0], start_intersection[1], true, true),
    new MarkerInfo(end_intersection[0], end_intersection[1], false, false)
  ]);

  // placeMarkers(globals.map, [
  //   new MarkerInfo(globals.intersections[0][0], globals.intersections[0][1], true, true),
  //   new MarkerInfo(globals.intersections[globals.intersections.length-1][0],globals.intersections[globals.intersections.length-1][1], false, false)
  // ]);

  intersectionStart(input_loc_text[0], input_loc_text[1]);
  displayStreetview(globals.map, start_intersection[0], start_intersection[1]);
}

// TODO: intersection load form step 1??
function intersectionLoad(intersections) {
  globals.intersections = intersections;
}

function intersectionStart(start, end) {
  // console.log(startx, starty, endx, endy);

  // globals.start_intersection = globals.intersections.indexOf((startx, starty));
  // globals.end_intersection = globals.intersections.indexOf((endx, endy));
  // globals.curr_intersection = globals.start_intersection;

  globals.start_intersection = start;
  globals.end_intersection = end;
  globals.curr_intersection = globals.start_intersection;

  console.log(globals);
}

function intersectionNext() {

  // add crossability
  globals.crossability.push({
    'loc': globals.intersections[globals.curr_intersection],
    'crossable': $('.radio :checked').val()
  });

  globals.curr_intersection++;

  if (globals.curr_intersection < globals.end_intersection) {
    // show next section
    var latlng = new google.maps.LatLng(
      globals.intersections[globals.curr_intersection][0], globals.intersections[globals.curr_intersection][1]);
    displayStreetview(globals.map, latlng);
    // $('#')
  }
  
  else {
    // complete task
    console.log('here!');
    finishSection();
  }
}


function finishSection() {
  $('#instructions-base').hide();
  $('#result-base').show();
  $('#result-div-text').append(JSON.stringify(globals.crossability));
}
