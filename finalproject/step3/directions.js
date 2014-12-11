// globals.start = new google.maps.LatLng(42.370769, -71.117342);
// globals.end = new google.maps.LatLng(42.363988, -71.124164);

globals.start = new google.maps.LatLng(42.37079689999999, -71.11742509999999);
globals.end = new google.maps.LatLng(42.3801904, -71.12509539999996);

globals.weight = 7;

// show static route of points on map
function showStaticRoute(points) {
     // create line to represent route
     var polyroute = new google.maps.Polyline({
        strokeColor: 'blue',
        strokeWeight: globals.weight,
        path: points
     });

     polyroute.setMap(globals.map);
}
