<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/klan.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare klan object
$klan = new Klan($db);
 
// get id of klan to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of klan to be edited
$klan->tag = $data->tag;

// set klan property values
$klan->nazev = $data->name;
$klan->logo = $data->logo;
$klan->hymna = $data->anthem;
$klan->zeme_pusobeni = $data->country;
 
// update the klan
if($klan->update()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}
 
// if unable to update the klan, tell the user
else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>