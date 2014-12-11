// yay globals :)
var globals = {
  map: null,
  start: new google.maps.LatLng(42.370769, -71.117342),
  // end: new google.maps.LatLng(42.363988, -71.124164),
  end: new google.maps.LatLng(42.380216, -71.125039),
  directionsDisplay: null,
  directionsService: null,
  markersArray: []
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

  $('#input-loc').modal('show');

  getRoute();


  var ground_truth = [[42.37079689999999, -71.11742509999999],[42.379649703070385, -71.12467251732659],[42.37898099675762, -71.12417015384813],[42.37840525211632, -71.12377233764579],[42.37765791101481, -71.12316531041711],[42.37729828049165, -71.12284770985644],[42.377019833791245, -71.12257724334643],[42.37658564284933, -71.12219546803362],[42.375992447916865, -71.12101388090059],[42.37550533291056, -71.11996261623011],[42.37513990533766, -71.11914939605276],[42.37505536460976, -71.11911232140835],[42.37444719768779, -71.11885738982068],[42.37394296041304, -71.11892277002335],[42.37334668042175, -71.11856989860536],[42.37312344945484, -71.11790396926949],[42.3728851637608, -71.1171068236419],[42.37269216025804, -71.11642654188836],[42.37234230976074, -71.11657745422332],[42.37160825202197, -71.11691749632337],[42.37141750373189, -71.1170419238029],[42.37430368700686, -71.11882717164525],[42.3801904, -71.12509539999996]];

  for (var i = 0; i < ground_truth.length; i++) {
      var point = ground_truth[i];
      placeMarker(new google.maps.LatLng(point[0], point[1]), 'green');
  }

  // markers = [[42.37079689999999, -71.11742509999999],[42.37144937382926, -71.11701250076294],[42.371656474973214, -71.11688234351737],[42.37268587541868, -71.11643314361572],[42.37309456657829, -71.11782090903739],[42.37336752614236, -71.11855745315552],[42.37387889920181, -71.11887578403247],[42.37510250430761, -71.11912349174764],[42.375222212753684, -71.11935138702393],[42.375432201974014, -71.11981032876406],[42.37597523631185, -71.12101617037052],[42.37656418761088, -71.12216077199798],[42.377086609005396, -71.12265346527101],[42.37728937873335, -71.12284349441529],[42.377599223565035, -71.12311660573721],[42.37820227823592, -71.12362146377563],[42.378468575076504, -71.12380170822144],[42.37899062461632, -71.1241850211735],[42.37967342940622, -71.12470156123311],[42.37289653769024, -71.11713223546559],[42.37524484470867, -71.1193766475904],[42.37525011817275, -71.11938795004744],[42.37522676425707, -71.11933789630928],[42.3801904, -71.12509539999996]];
  // for (var i=0; i < markers.length; i++) {
  //   var ll = new google.maps.LatLng(markers[i][0], markers[i][1]);
  //   console.log(ll);
  //   placeMarker(ll);
  // }

}
google.maps.event.addDomListener(window, 'load', initialize);

function showLatLngs() {
  var latLngs = [];
  var endpoint = globals.markersArray[1];
  for (var i = 0; i < globals.markersArray.length; i++) {
    if (globals.markersArray[i] && i != 1) {
      latLngs.push(globals.markersArray[i].getPosition());
    }
  }

  latLngs.push(endpoint.getPosition());

  $('#instructions-base').hide();
  $('#result-base').show();

  $('#result-div-text').append(JSON.stringify(latLngs));
};
