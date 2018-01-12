// JavaScript source code
//========================================================================
//                         BUS STOPS
//========================================================================
function getAllStops() {
    //returns JSON object of all bus stop data in "stops.txt"
    //instantiates the object if null
    if (allStops === undefined)
        allStops = readStaticData("stops");
    return allStops;
}

function displayAllStops() {
    //might not be best way to display all stops
    //75 is quite arbitrary
    displayCloseStops(centerLatLng, 75);
}

function displayCloseStopsToStart() {
    //displays all bus stops that are within 'radius' miles of 'start'
    //start: LatLng of user enterd start location
    displayCloseStops(new google.maps.LatLng(start.position), getRadius());
}

function displayCloseStops(center, r) {
    //displays all bus stops within 'r' miles of 'center'
    //center: a LatLng
    //r: a number
    var data = getAllStops();
    var pos;
    for (var i = 0; i < data.length; i++) {
        pos = new google.maps.LatLng(data[i].stop_lat * 1, data[i].stop_lon * 1);
        if (distance(center, pos) < r) {
            addStopMarker(data[i], pos, mapVisibleKey);
        }
    }
    mapVisibleKey++;
}

function addStopMarker(stop, pos, _key) {
    //adds a bus stop marker
    //stop: a JSON object storing data for a bus stop from "stops.txt"
    //pos: the LatLng of the stop
    var newMarker = new google.maps.Marker({
        map: theMap,
        position: pos,
        title: stop.stop_id,
        icon: imgRoot + "blue.png"
    });
    mapVisible.push({ key: _key, marker: newMarker });
    newMarker.addListener('click', function () {
        displayClosePlaces(this.position, 500);
    });
}

function getStopDataById(id) {
    //returns all stop data from stops.txt file
    //for the stop with the provided stop_id 
    var stops = getAllStops();
    var lo = 0;
    var hi = stops.length - 1;
    var mid;
    while (lo <= hi) {
        mid = Math.floor((lo + hi) / 2);
        if (id === stops[mid].stop_id)
            return stops[mid];
        if (id < stops[mid].stop_id)
            hi = mid - 1;
        else
            lo = mid + 1;
    }

    for (var i = 0; i < stops.length; i++) {
        if (stops[i].stop_id === id)
            return stops[i];
    }
}