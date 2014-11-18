globals.green = ['#0F9D58', '#7AEAC5'];
globals.red = ['#DB4437', '#F5A2BD'];
globals.weight = 7;

// display sections of routes color-coded by accessibility
// section - Section object (see app.js)
function showRouteAccessibility(section) {
    getRoute(section);
}


function showSectionMarkers(sections) {
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];

        if (section.type == 'mid') {
            console.log('TODO');
        }
        else {
            console.log('TODO');
        }
    }
}
