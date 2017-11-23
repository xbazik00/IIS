<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/hra.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare hra object
$hra = new Hra($db);
 
// get id of hra to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of hra to be edited
$hra->nazev = $data->name;

// set hra property values
$hra->zanr = $data->genre;
$hra->vydavatel = $data->publisher;
$hra->mody = $data->modes;
$hra->datum_vydani = $data->created;
 
// update the hra
if($hra->update()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}
 
// if unable to update the hra, tell the user
else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>