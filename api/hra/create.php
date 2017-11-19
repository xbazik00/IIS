<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/hra.php';
 
$database = new Database();
$db = $database->getConnection();
 
$hra = new Hra($db);

$data = json_decode(file_get_contents("php://input"));

$hra->nazev = $data->name;
$hra->zanr = $data->genre;
$hra->vydavatel = $data->publisher;
$hra->mody = $data->modes;
$hra->datum_vydani = $data->created;

if($hra->create()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>