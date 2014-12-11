// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  markersArray: [],
  sections: [],
  intersections: [[42.37079689999999, -71.11742509999999],[42.379649703070385, -71.12467251732659],[42.37898099675762, -71.12417015384813],[42.37840525211632, -71.12377233764579],[42.37765791101481, -71.12316531041711],[42.37729828049165, -71.12284770985644],[42.377019833791245, -71.12257724334643],[42.37658564284933, -71.12219546803362],[42.375992447916865, -71.12101388090059],[42.37550533291056, -71.11996261623011],[42.37513990533766, -71.11914939605276],[42.37505536460976, -71.11911232140835],[42.37444719768779, -71.11885738982068],[42.37394296041304, -71.11892277002335],[42.37334668042175, -71.11856989860536],[42.37312344945484, -71.11790396926949],[42.3728851637608, -71.1171068236419],[42.37269216025804, -71.11642654188836],[42.37234230976074, -71.11657745422332],[42.37160825202197, -71.11691749632337],[42.37141750373189, -71.1170419238029],[42.37430368700686, -71.11882717164525],[42.3801904, -71.12509539999996]],
  start_intersection: 0,
  end_intersection: 0,
  highlightColor: '#FFFF00',
  regularColor: '#3366FF'
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

  $('#input-loc').modal('show');
  getRoute(globals.start, globals.end, globals.regularColor);
  sectionTypeSelect(center_pos);

  // add markers start and endpoints
  addEndpointMarker(globals.start, true);
  addEndpointMarker(globals.end, false);
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

  console.log(input_loc_text, start_intersection, end_intersection);

  placeMarkers(globals.map, [
    new MarkerInfo(start_intersection[0], start_intersection[1], true, true),
    new MarkerInfo(end_intersection[0], end_intersection[1], false, false)
  ]);

  intersectionStart(input_loc_text[0], input_loc_text[1]);
  displayStreetview(globals.map, start_intersection[0], start_intersection[1]);

  // show highlighted route
  var startLatLng = new google.maps.LatLng(
    start_intersection[0], start_intersection[1]);
  var endLatLng = new google.maps.LatLng(
    end_intersection[0], end_intersection[1]);
  getRoute(startLatLng, endLatLng, globals.highlightColor);
}

function intersectionStart(start, end) {
  globals.start_intersection = start;
  globals.end_intersection = end;

}

function sectionTypeSelect(loc) {

  $('#section-type').hide();
  // var type = $('#section-type select').val();
  var type = 'mid';
  $('#section-'+type).show();
  if (type == 'mid') {
    // $('#section-add').show();

    globals.sections.push({
      // 'loc': globals.map.getStreetView().getPosition(),
      'loc' : loc,
      'type': type,
      'obstacles':[]
    });
  }
  // 

  

  $('#section-done').show();

}

function reportMidObstacle() {

  var obstacle = $('#section-mid-report').val();
  var side = $('#section-mid-side').val();
  var section = globals.sections.pop();
  section.obstacles.push({
    'loc': globals.map.getStreetView().getPosition(),
    'type': obstacle,
    'side': side
  });
  globals.sections.push(section);

  $('#section-obstacles').show();

  $('#section-obstacles ul').append($('<li>')
    .append('A(n) '+obstacle+' on the '+side+ ' side.'));

}

function addSection() {
  $('#section-type').show();
  $('#section-int').hide();
  $('#section-mid').hide();
  $('#section-add').hide();
  $('#section-obstacles').hide();
  $('#section-obstacles ul').empty();

  $('#section-int-type').show();
  $('#section-int-obstacles').hide();

  var section = globals.sections.pop()

  if (section.type == 'int') {
    section.obstacles.push($('#section-int-input').val());
    $('#section-int-input').val('');
  }

  globals.sections.push(section);

}


function sectionIntType(type) {
  $('#section-int-type').hide();
  $('#section-int-obstacles').show();
  $('#section-int-img').attr('src','../img/'+type+'.png');
  $('#section-add').show();

  globals.sections.push({
    'loc': globals.map.getStreetView().getPosition(),
    'type': type,
    'obstacles':[]
  });
}


function finishSection(type) {
  $('#instructions-base').hide();
  $('#result-base').show();
  $('#result-div-text').append(JSON.stringify(globals.sections));
}



