globals.green = ['#0F9D58', '#7AEAC5'];
globals.red = ['#DB4437', '#F5A2BD'];
globals.weight = 7;

// display sections of routes color-coded by accessibility
// section - Section object (see app.js)
function showRouteAccessibility(section) {
    getRoute(section);
}

// display static green line for accessible routes,
// draggable directions for inaccessible routes
function showRoute(polyroute) {
    // https://developers.google.com/maps/documentation/javascript/reference#DirectionsRenderer
    console.log('TODO');
}