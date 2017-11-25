<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/turnaj.php';

 
$database = new Database();
$db = $database->getConnection();
 
$turnaj= new Turnaj($db);

$data = json_decode(file_get_contents("php://input"));

$turnaj->id = $data->id;

$turnaj->nazev = $data->name;
$turnaj->datum_konani = $data->date;
$turnaj->hlavni_cena = $data->prize;
$turnaj->nazev_hry = $data->game;
$turnaj->vitez = $data->winner;
$turnaj->id_organizator_turnaje = $data->id_organizer;


if($turnaj->update()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>