globals.left = '#EAE37A';
globals.right = '#7A81EA';
globals.both = '#66C266'; 
globals.none = '#DB4437';
globals.weight = 17;

// DELETE when done
function addMarker(latlng) {
    return new google.maps.Marker({
        position: latlng,
        map: globals.map,
        title:"Hello World!"
    });
}
