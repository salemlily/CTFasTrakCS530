// JavaScript source code
//========================================================================
//                     READING USER INPUT
//========================================================================
function displayUserStartStopLoc() {
    //executed when 'GO' button is pressed
    //obtains the text from the text fields for start location and end location
    //geocodes the text and displays a marker at each location entered
    var startInput = document.userInput.start.value;
    var endInput = document.userInput.end.value;
    if (startInput !== "") { //if user entered something
        if (start.marker !== null) { //if we already have start marker
            start.marker.setMap(null); //remove it from map
        }
        start = createEndpointMarker(startInput, imgRoot + "green.png");
    }
    if (endInput !== "") {
        if (end.marker !== null) {
            end.marker.setMap(null);
        }
        end = createEndpointMarker(endInput, imgRoot + "red.png");
    }
}

function createEndpointMarker(address, image) {
    //pointType is either   start   or    end      global variable
    //address is user input from text field, image either red or green marker
    //overwrites previous values of 'start' or 'end' and removes old marker from map.
    var geoCode = getGeoCode(address);
    var pos = geoCode.results[0].geometry.location;
    var newMarker = new google.maps.Marker({
        map: theMap,
        position: pos,
        icon: image
    });
    return { position: pos, text: address, marker: newMarker };
}

function getRadius() {
    //reads radius from user input and verifies it is valid
    //if invalid returns DEFAULT_RADIUS, else returns radius
    var radius = document.userInput.radius.value;
    if (isNaN(radius * 1)) {
        document.userInput.radius.value = DEFAULT_RADIUS + "";
        return DEFAULT_RADIUS;
    } else {
        radius = radius * 1; //coerce to number
        if (radius <= 0) {
            document.userInput.radius.value = DEFAULT_RADIUS + "";
            return DEFAULT_RADIUS;
        } else {
            return radius;
        }
    }
}