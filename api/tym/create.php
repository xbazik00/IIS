<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/tym.php';
include_once '../objects/uzivatele_v_tymech.php';

 
$database = new Database();
$db = $database->getConnection();
 
$tym = new Tym($db);
$uzivatele_v_tymech = new UzivateleVTymech($db);

$data = json_decode(file_get_contents("php://input"));

$tym->nazev_tymu= $data->name;
$tym->pocet_hracu = $data->number_of_players;
$tym->nazev_hry = $data->game;

$uzivatele_v_tymech->nazev_tymu = $data->name;
$uzivatele_v_tymech->prezdivka_uzivatele = $data->userName;

if($tym->create() && $uzivatele_v_tymech->add()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>