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
            console.log('TODO');
        }
    }
}
