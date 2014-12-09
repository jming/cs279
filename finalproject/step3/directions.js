globals.start = new google.maps.LatLng(42.370769, -71.117342);
globals.end = new google.maps.LatLng(42.363988, -71.124164);

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
