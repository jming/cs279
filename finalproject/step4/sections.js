globals.green = ['#0F9D58', '#7AEAC5'];
globals.red = ['#DB4437', '#F5A2BD'];
globals.weight = 7;

// display sections of routes color-coded by accessibility
// section - Section object (see app.js)
function showRouteAccessibility(section) {
    getRoute(section);
}

/*
 * display routes according to accessibility and selection
 *
 * accessible   selected      color           draggable
 * --------------------------------------------------------
 *    yes         yes        dark green          no
 *    yes         no         light green         no
 *    no          yes        route blue          yes
 *    no          no         light red           no
 */
function showRouteInfo(polyrouteInfo) {
    // if not accessible but selected, show as draggable route
    if (polyrouteInfo.isSelected && !polyrouteInfo.isAccessible) {
        // grab start and end points
        var start = polyrouteInfo.points[0];
        var end = polyrouteInfo.points[polyrouteInfo.points.length - 1];

        // create draggable route between these endpoints
        showDraggableRoute(start, end);
    }
    // if not selected, show static route with color based on accessibility and selectedness
    else {
        showStaticRoute(polyrouteInfo.points, polyrouteInfo.isAccessible, polyrouteInfo.isSelected);
    }
}