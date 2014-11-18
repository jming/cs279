function showSectionMarkers(sections) {
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];

        if (section.type == 'mid') {
            // skip if no obstacles
            for (var oId = 0; oId < section.obstacles.length; oId++) {
                console.log('TODO');                
            }
        }
        else {
            var section_img = '';
            if (section.type == 'lrud') {
                section_img = '../img/int-four-4.png';
            }
            else {
                section_img = '../img/int-three-3.png';
            }
            var lat = section.loc.k;
            var lng = section.loc.B;
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: globals.map,
                title: 'Intersection ' + i.toString(),
                clickable: true,
                icon: section_img
            });
        }
    }
}
