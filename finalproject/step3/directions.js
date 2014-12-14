// globals.start = new google.maps.LatLng(42.370769, -71.117342);
// globals.end = new google.maps.LatLng(42.363988, -71.124164);

// globals.start = new google.maps.LatLng(42.37079689999999, -71.11742509999999);
// globals.end = new google.maps.LatLng(42.3801904, -71.12509539999996);

globals.weight = 7;

function getRoute(start, end) {
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true
    };

    globals.directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            showStaticRoute(response.routes[0]);
        }
    });
}

// show static route of points on map
function showStaticRoute(route) {
    // create line to represent route
    var polyroute = new google.maps.Polyline({
        strokeColor: 'blue',
        strokeWeight: globals.weight
    });

    $(route.legs).each(function(i, leg) {
        $(leg.steps).each(function(j, step) {
            $(step.path).each(function(k, point) {
                polyroute.getPath().push(point);
            })
        })
    });

    polyroute.setMap(globals.map);
}
