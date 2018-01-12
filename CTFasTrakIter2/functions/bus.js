// JavaScript source code
//========================================================================
//                           BUSSES
//========================================================================
function displayAllBusses() {
    //might not be the best way to display all busses
    //radius=75 is quite arbitrary
    displayCloseBusses(centerLatLng, 75);
}

function displayCloseBussesToStart() {
    //executed when 'display close busses' button is pushed
    //diplays all busses within 'radius' miles of the 'start' location
    //'radius' is the user enterd radius
    //'start' is the LatLng of the user entered start location
    displayCloseBusses(new google.maps.LatLng(start.position), getRadius());
}

function displayCloseBusses(center, r) {
    //displays all busses that are within 'r' miles of 'center'
    //center: LatLng 
    //r: a number
    var data = readRealTimeData(1).entity;
    var pos;
    for (var i = 0; i < data.length; i++) {
        pos = new google.maps.LatLng(data[i].vehicle.position.latitude * 1,
                                     data[i].vehicle.position.longitude * 1);
        if (distance(center, pos) < r) {
            addBusMarker(data[i], pos, mapVisibleKey);
        }
    }
    mapVisibleKey++;
}

function addBusMarker(bus, pos, _key) {
    //bus: JSON object, element of the vehicle positions live feed array
    //pos: LatLng, the bus's position as a LatLng object
    //displays the bus with a marker
    //adds a listener to the marker so that when clicked, bus stops that this 
    //bus will stop at are displayd with markers
    newMarker = new google.maps.Marker({
        map: theMap,
        position: pos,
        busId: bus.id,
        tripId: bus.vehicle.trip.trip_id,
        routeId: bus.vehicle.trip.route_id,
        //title: bus.id,
        icon: "http://maps.google.com/mapfiles/ms/icons/bus.png"
    });
    mapVisible.push({ key: _key, marker: newMarker });

    newMarker.addListener('click', function () {
        //I know this is messy, fix this soon
        var busStop, trip, pos;
        var id = this.tripId;   //tripId of the Marker that was clicked
        var tripData = readRealTimeData(0).entity;
        var i = 0;
        //find the trip update that matches the trip id of the clicked bus
        while (id !== tripData[i].id)
            i++;

        //this is the trip update we are interested in
        trip = tripData[i].trip_update.stop_time_update;
        i = 0;
        //skip the stops in this trip that the bus has already visited at
        while (trip[i].departure === null)
            i++;

        //for each bus stop remaining, add a marker to display it
        for (var j = i; j < trip.length; j++) {
            busStop = getStopDataById(trip[j].stop_id);
            pos = new google.maps.LatLng(busStop.stop_lat * 1, busStop.stop_lon * 1);
            addStopMarker(busStop, pos);
        }
    });
}