// yay globals :)
var globals = {
  map: null,
  directionsDisplay: null,
  directionsService: null,
  markersArray: [],
  sections: [],
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
  getRoute();


}
google.maps.event.addDomListener(window, 'load', initialize);

// console.log(window.map)

function updateMap() {
  $('#input-loc').modal('hide');
  var input_loc_text = $('#input-loc-text').val().split(';');

  for (var i=0; i<input_loc_text.length; i++) {
    input_loc_text[i] = input_loc_text[i].replace('(','').replace(')','').split(',');
  }
  // (42.365517, -71.122176);(42.366523, -71.119212)
  // var input_loc_parsed = ('[' + input_loc_text + ']');
  console.log(input_loc_text);
  placeMarkers(globals.map, [
    new MarkerInfo(input_loc_text[0][0], input_loc_text[0][1], true, true),
    new MarkerInfo(input_loc_text[1][0], input_loc_text[1][1], false, false)
  ]);
}

function sectionTypeSelect() {

  $('#section-type').hide();
  var type = $('#section-type select').val();
  $('#section-'+type).show();
  if (type == 'mid') {
    $('#section-add').show();
  }
  // 

  globals.sections.push({
    'loc': globals.map.getStreetView().getPosition(),
    'type': type,
    'obstacles':[]
  });

  $('#section-done').show();

}

function reportMidObstacle() {

  var obstacle = $('#section-mid-report').val();
  var side = $('#section-mid-side').val();
  var section = globals.sections.pop()
  section.obstacles.push({
    'loc': globals.map.getStreetView().getPosition(),
    'type': obstacle,
    'side': side
  });
  globals.sections.push(section)

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



