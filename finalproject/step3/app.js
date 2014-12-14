// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  markersArray: [],
  sections: [],
  intersections: [],
  start_intersection: 0,
  end_intersection: 0,
  curr_intersection: 0,
  crossability: [],
  start: new google.maps.LatLng(42.37079689999999, -71.11742509999999),
  end: new google.maps.LatLng(42.3801904, -71.12509539999996)
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

  // add markers start and endpoints
  addEndpointMarker(globals.start, true);
  addEndpointMarker(globals.end, false);

  intersectionLoad([[42.37079689999999,-71.11742509999999],[42.37141750373189,-71.1170419238029],[42.37160825202197,-71.11691749632337],[42.37234230976074,-71.11657745422332],[42.37269216025804,-71.11642654188836],[42.3728851637608,-71.1171068236419],[42.37312344945484,-71.11790396926949],[42.37334668042175,-71.11856989860536],[42.37394296041304,-71.11892277002335],[42.37430368700686,-71.11882717164525],[42.37444719768779,-71.11885738982068],[42.37505536460976,-71.11911232140835],[42.37513990533766,-71.11914939605276],[42.37550533291056,-71.11996261623011],[42.375992447916865,-71.12101388090059],[42.37658564284933,-71.12219546803362],[42.377019833791245,-71.12257724334643],[42.37729828049165,-71.12284770985644],[42.37765791101481,-71.12316531041711],[42.37840525211632,-71.12377233764579],[42.37898099675762,-71.12417015384813],[42.379649703070385,-71.12467251732659],[42.3801904,-71.12509539999996]]);

  $('#input-loc').modal('show');
  getRoute(globals.start, globals.end);
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

  /*
  placeMarkers(globals.map, [
    new MarkerInfo(start_intersection[0], start_intersection[1], true, true),
    new MarkerInfo(end_intersection[0], end_intersection[1], false, false)
  ]);
  */

  // placeMarkers(globals.map, [
  //   new MarkerInfo(globals.intersections[0][0], globals.intersections[0][1], true, true),
  //   new MarkerInfo(globals.intersections[globals.intersections.length-1][0],globals.intersections[globals.intersections.length-1][1], false, false)
  // ]);

  intersectionStart(input_loc_text[0], input_loc_text[1]);
  var startLatLng = new google.maps.LatLng(start_intersection[0], start_intersection[1]);
  displayStreetview(globals.map, startLatLng);
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

  var bounds = new google.maps.LatLngBounds();

  for (var i = globals.start_intersection; i <= globals.end_intersection; i++) {
    var pos = new google.maps.LatLng(
      globals.intersections[i][0], globals.intersections[i][1]);
    addIntersection(pos);
    bounds.extend(pos);
  }

  globals.map.fitBounds(bounds);
}

function intersectionNext() {

  var checked = $('.checkbox :checked');
  console.log(checked);
  var crossable = []
  for (var i = 0; i < checked.length; i++) {
    console.log(checked[i]);
    crossable.push(checked[i].value);
    checked[i].checked = false;
  }

  // add crossability
  globals.crossability.push({
    'loc': globals.intersections[globals.curr_intersection],
    'crossable': crossable
  });

  globals.curr_intersection++;

  if (globals.curr_intersection <= globals.end_intersection) {
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
  $('#section-base').hide();
  $('#result-base').show();
  $('#result-div-text').append(JSON.stringify(globals.crossability));
}

