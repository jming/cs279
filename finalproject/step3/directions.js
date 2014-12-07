globals.start = new google.maps.LatLng(42.370769, -71.117342);
globals.end = new google.maps.LatLng(42.363988, -71.124164);

globals.left = '#EAE37A';
globals.right = '#7A81EA';
globals.both = '#66C266';
globals.none = '#DB4437';
globals.weight = 7;

// show static route of points on map
function showStaticRoute(points, accessibility) {
     // create line to represent route
     var polyroute = new google.maps.Polyline({
        strokeColor: globals[accessibility],
        strokeWeight: globals.weight,
        path: points
     });

     polyroute.setMap(globals.map);
}
