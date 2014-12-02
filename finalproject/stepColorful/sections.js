// 0: not selected, 1: selected
globals.left = '#EAE37A';
globals.right = '#7A81EA';
globals.both = '#7AEAC5'; 
globals.none = '#DB4437';
globals.weight = 17;


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
    // // if not accessible but selected, show as draggable route
    // if (polyrouteInfo.isSelected && !polyrouteInfo.isAccessible) {
    //     // grab start and end points
    //     var start = polyrouteInfo.points[0];
    //     var end = polyrouteInfo.points[polyrouteInfo.points.length - 1];

    //     // create draggable route between these endpoints
    //     showDraggableRoute(start, end);
    // }
    // // if not selected, show static route with color based on accessibility and selectedness
    // else {
        showStaticRoute(polyrouteInfo.points, polyrouteInfo.isAccessible, polyrouteInfo.isSelected);
    // }
}
