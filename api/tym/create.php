<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/tym.php';
 
$database = new Database();
$db = $database->getConnection();
 
$tym = new tym($db);

$data = json_decode(file_get_contents("php://input"));

$tym->nazev_tymu= $data->name;
$tym->pocet_hracu = $data->number_of_players;
$tym->nazev_hry = $data->game;


if($tym->create()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>