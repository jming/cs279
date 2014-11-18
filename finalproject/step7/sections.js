function showSectionMarkers(sections) {
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var section_img = '';

        if (section.type == 'mid') {
            // show all obstacles with their position
            for (var oId = 0; oId < section.obstacles.length; oId++) {
                var obstacle = section.obstacles[oId];
                section_img = '../img/obs-' + obstacle.side + '-resize.png';
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(obstacle.loc.k, obstacle.loc.B),
                    map: globals.map,
                    title: 'Obstacle ' + oId.toString(),
                    clickable: true,
                    icon: section_img
                });
            }
        }
        else {
            if (section.type == 'lrud') {
                section_img = '../img/int-four-4.png';
            }
            else {
                section_img = '../img/int-three-3.png';
                // section_img = '../img/int-four-4.png';
            }
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(section.loc.k, section.loc.B),
                map: globals.map,
                title: 'Intersection ' + i.toString(),
                clickable: true,
                icon: section_img
            });
        }
    }
}
