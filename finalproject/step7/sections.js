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
            var section_img = '';
            if (section.type == 'lrud') {
                section_img = '../img/int-four-4.png'
            }
            else {
                section_img = '../img/int-three-3.png'
            }
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(section.loc),
                map: globals.map,
                title: 'Intersection ' + i.toString(),
                clickable: true,
                icon: section_img
            });
        }
    }
}
