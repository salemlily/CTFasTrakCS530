// JavaScript source code
//========================================================================
//                        READ DATA
//========================================================================      
function readStaticData(fileName) {
    //fileName: string, must be one of ["agency", "calendar", "calendar_dates", "routes", "shapes", "stop_times", "stops", "trips"]
    //will return an array of JSON objects 
    var smallFileNames = ["routes", "shapes", "stops", "trips"];
    if (smallFileNames.indexOf(fileName) === -1) {
        update("not a valid static file name");
        return null;
    }
    else {
        //       https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/static-data/   stops        _json.txt
        var url = 'https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/static-data/' + fileName + '_json.txt';
        //var url = 'https://raw.githubusercontent.com/jmluczy/TBDs-CTFasTrak-Project/static-data/version1/CTFasTrakStaticData/' + fileName + 'JSON.txt'
        return makeXMLHttpRequest(url);
    }
}

function readRealTimeData(n) {
    //n: number, must be an integer 0, 1, 2, 3 to indicate which of the live data streams to access
    //respectively: trip updates, vehicle positions, alerts, combined
    //will return an object containing the data from the feed specified
    if (n < 0 || n > 4)
        return null;
    else {
        //var feedType = ['tripupdate/tripupdates', 'vehicle/vehiclepositions', 'alert/alerts', 'externalfeed/trapezerealtimefeed'];
        //var url = 'http://65.213.12.244/realtimefeed/' + feedType[n] + '.json';
        var feedType = ['tripupdates', 'vehiclepositions', 'alerts', 'combined'];
        var url = 'https://raw.githubusercontent.com/jmluczy/CTFasTrakCS530/real-time-data-sample/' + feedType[n] + '.txt';
        return makeXMLHttpRequest(url);
    }
}
//========================================================================
//                  QUERIES
//    Nearly all query functions should return an array of JSON objects
//    I can help with turning what ever the query returns into an array of JSON objects
//========================================================================

function shapesFromShapeId(shapeId) { //Purpose: shape_pt_lat, shape_pt_lon
    //FROM 'shapes_json' File/Table
    //GET  all records such that       shape_id = shapeId
    //Return an array of JSON objects
    /*<?php
      $connect = new mysqli($servername, $username, $password, $database);
      $shapeID = shapeId;
      $res = $connect-> query("SELECT shape_pt_lat,shape_pt_lng FROM shapes_json WHERE shape_id =".$shapeID);
      $out = array();
      $out = $res->fetch_all(MYSQLI_ASSOC);
      echo json_encode($out);
      $connect->close();
     ?>*/
}

function stopTimesFromStopId(stopId) { //Purpose: trip_id
    //FROM 'stop_times_json' File/Table     
    //GET all records such that        stop_id = stopId
    //Return an array of JSON objects
    /* <?php
     $connect = new mysqli($servername, $username, $password, $database);
     $stopID = stopId;
     $res = $connect-> query("SELECT trip_id FROM stop_times_json WHERE stop_id =".$stopID);
     $out = array();
     $out = $res->fetch_all(MYSQLI_ASSOC);
     echo json_encode($out);
     $connect->close();
     ?>*/
}

function tripsFromTripId(tripId) {  //Purpose: shape_id
    //FROM 'trips_json' File/Table
    //GET all records such that         trip_id = tripId
    //Return an array of JSON objects      (I think search should yield 1 object)
    /*<?php
    $connect = new mysqli($servername, $username, $password, $database);
    $tripID = tripId;
    $res = $connect-> query("SELECT shape_id FROM trips_json WHERE trip_id =".$tripID);
    $out = array();
    $out = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($out);
    $connect->close();
    ?>*/
}

function routesFromRouteId(routeId) { //Purpose: route_color
    //FROM 'routes_json' File/Table
    //GET all records such that        route_id = routeId
    //Return an array of JSON objects     (I think search should yield 1 object)
    /*<?php
    $connect = new mysqli($servername, $username, $password, $database);
    $routeID = routeId;
    $res = $connect-> query("SELECT route_color FROM routes_json WHERE route_id =".$routeID);
    $out = array();
    $out = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($out);
    $connect->close();
    ?>*/
}
