<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/klan.php';
 
$database = new Database();
$db = $database->getConnection();
 
$klan = new Klan($db);

$data = json_decode(file_get_contents("php://input"));

$klan->tag = $data->tag;
$klan->nazev = $data->name;
$klan->logo = $data->logo;
$klan->hymna = $data->anthem;
$klan->zeme_pusobeni = $data->country;
$klan->vudce_klanu = $data->boss;

if($klan->create()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>