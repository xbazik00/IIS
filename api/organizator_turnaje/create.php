<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/organizator_turnaje.php';

 
$database = new Database();
$db = $database->getConnection();
 
$organizator_turnaje= new OrganizatorTurnaje($db);

$data = json_decode(file_get_contents("php://input"));

$organizator_turnaje->prezdivka = $data->id;
$organizator_turnaje->jmeno = $data->name;
$organizator_turnaje->tel_cislo = $data->phone;


if($organizator_turnaje->create()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>