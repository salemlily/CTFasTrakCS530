// JavaScript source code
//========================================================================
//                         PLACES
//========================================================================
function displayClosePlacesToStart() {
    displayClosePlaces(start.position, 3000);
}

function displayClosePlaces(center, r) {
    //center: LatLng
    //r: number, (meters)
    //displays all Places (currently just stores), within r meters of center
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(theMap);
    service.nearbySearch({
        location: center,
        radius: r,
        type: placeTypes
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        //update(JSON.stringify(results));
        for (var i = 0; i < results.length; i++) {
            createPlaceMarker(results[i], mapVisibleKey);
        }
        mapVisibleKey++;
    }
}

function createPlaceMarker(place, _key) {
    var newMarker = new google.maps.Marker({
        map: theMap,
        position: place.geometry.location,
        icon: imgRoot + "orange.png"
    });
    mapVisible.push({ key: _key, marker: newMarker });


    google.maps.event.addListener(newMarker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(theMap, this);
    });
}