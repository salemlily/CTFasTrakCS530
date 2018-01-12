// JavaScript source code
//========================================================================
//                        ROUTES
//========================================================================
function drawShape(shapeId, pointInSequence) {
    //Draws shape of given shapeId from pointInSequence forward
    var points = getPointsOfShape(shapeId);
    points = points.slice(pointInSequence - 1, points.length);
    theMap.setCenter(points[0]);
    new google.maps.Polyline({
        strokeColor: "A400A4",
        path: points,
        map: theMap
    });
}

function getRouteAndShapeOfTrip(tripId) {
    var trips = readStaticData("trips");
    var lo = 0;
    var hi = trips.length - 1;
    var mid;
    while (lo <= hi) {
        mid = Math.floor((lo + hi) / 2);
        if (tripId === trips[mid].trip_id)
            return { route_id: trips[mid].route_id, shape_id: trips[mid].shape_id };
        else if (tripId < trips[mid].trip_id)
            hi = mid - 1;
        else
            lo = mid + 1;
    }
}

function getPointsOfShape(shapeId) {
    //reads the 'shapes' static data file, searches for the records which match
    //provided 'shapeId' returns an array of LatLng objects
    //*****NOTE**** 
    //in shapes.txt, shape_id are stored as strings but sorted by numeric value,
    //coerce them to numbers
    var key = shapeId * 1;  //coerce to number
    var shapes = readStaticData("shapes");
    var points = [];
    var lo = 0;
    var hi = shapes.length - 1;
    var mid, id;

    //find index that has the shapeId quickly
    while (lo <= hi) {
        mid = Math.floor((lo + hi) / 2);
        id = shapes[mid].shape_id * 1;
        if (key === id)
            break;
        else if (key < id)
            hi = mid - 1;
        else
            lo = mid + 1;
    }
    update(shapes[mid].shape_id);

    //now back up (decrease index) until you hit the first record with the shapeId
    var i = mid;
    while (i >= 0 && shapeId === shapes[i].shape_id)
        i--;
    //went one too far so increment i, 
    if (i !== 0) i++;
    while (shapes[i].shape_id === shapeId) {
        points.push(
          new google.maps.LatLng(shapes[i].shape_pt_lat, shapes[i].shape_pt_lon)
        );
        i++;
    }
    update(points.length);
    return points;
}

function getStopTimeDataByStopId(stopId) {
    //Currently stop_times file is partitioned into 4 files to accommodate github's preference for small files
    //stop_times files partitioned by stop_id
    // [1, 2130]    [2131, 4337]    [4339, 8471]    [8472, ]
    var id = stopId * 1; //coerce to number
    var url = "https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/big-files/stop_times_";
    if (id <= 4377) {
        if (id <= 2130)
            url += 1;
        else
            url += 2;
    } else {
        if (id <= 8471)
            url += 3;
        else
            url += 4;
    }
    url += "_json.txt";
    return makeXMLHttpRequest(url);
}
