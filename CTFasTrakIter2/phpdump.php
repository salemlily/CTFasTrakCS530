<?php
$servername = "localhost";
$username = "guest";
$password = "password";

$connect = new mysqli($servername, $username, $password)
?>
<?php
$connect -> query("INSERT INTO Location (Start)")
VALUES (//variable for start location));
?>
<?php
$res = $connect -> query("SELECT * FROM Start");
?>
<?php
 header("Content-Type: application/json; charset=UTF-8");
 $obj = json_decode($_GET["routes_json.txt"], false);
 $test = $connect->query("INSERT INTO Routes (route_id, route_short_name, route_type, route_url, route_color, route_text_color)
                          VALUES ($obj->route_id, $obj->route_short_name, $obj->route_type, $obj->route_url, $obj->route_color, $obj->route_text_color)");