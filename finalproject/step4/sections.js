globals.left = '#EAE37A';
globals.right = '#7A81EA';
globals.both = '#66C266'; 
globals.none = '#DB4437';
globals.weight = 17;

function addIntersectionInfo(latlng, crossable) {
    return new google.maps.Circle({
        strokeColor: '#FFFFFF',
        strokeWeight: 4,
        fillColor: crossable ? globals.both : globals.none,
        fillOpacity: 0.85,
        center: latlng,
        map: globals.map,
        radius: 10
    });
}
