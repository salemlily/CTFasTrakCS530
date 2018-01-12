// JavaScript source code

//========================================================================
//                    GENERAL UTILITIES
//========================================================================
function makeXMLHttpRequest(url) {
    //for more information on XMLHttpRequest object,
    //see: https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    if (req.status === 200) {
        //update(req.responseText);
        return JSON.parse(req.responseText);
    } else {
        update("null returned");
        return null;
    }
}

function isInNearFuture(time, windowLength) {
    //THIS DOESN'T WORK RIGHT NOW
    //returns true if 'time' is less than 'windowLength' hours in the future
    var time = time.split(":");
    update(JSON.stringify(time));
    var now = new Date().getTime();
    var futureTime = new Date(1970, 0, 1, time[0] * 1, time[1] * 1, time[2] * 1, 0);
    update(JSON.stringify(now));
    var futureTime = new Date(now.toLocalDate() + time).valueOf();
    update(JSON.stringify(futureTime));
}

function distance(pos1, pos2) {
    //pos1, pos2: LatLng     NO LatLng literals
    //returns distance (in miles) between the two positions entered
    var dist = google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2); //in meters
    dist = dist / 1609.34; //convert to miles
    return dist;
}

function update(message) {
    //only purpose of this method is to aid in tracing. 
    //prints the argument message at the bottom of the webpage.
    var text = document.getElementById("testing").innerHTML;
    text = text + "<br>" + message;
    document.getElementById("testing").innerHTML = text;
}

function getGeoCode(address) {
    //address: string
    //geocodes an address string returns the geocode JSON array
    address = address.replace(" ", "+");
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
       + address + '&components=state:CT&key=AIzaSyBezkqLyMpXAF9dBb4X5rZeQkyF8Y5_Te4';
    return makeXMLHttpRequest(url);
}
//************************************************************************

function calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRendererOptions = {
        map: theMap,
        panel: document.getElementById("directions-panel"),
        hideRouteList: false,
        preserveViewPort: false
    };
    var directionsRenderer = new google.maps.DirectionsRenderer(directionsRendererOptions);

    directionsService.route({
        origin: start.position,
        destination: end.position,
        travelMode: 'TRANSIT'
    }, function (response, status) {
        if (status === 'OK') {
            //update(JSON.stringify(response));
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}