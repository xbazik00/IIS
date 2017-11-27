<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/zapas.php';
 
$database = new Database();
$db = $database->getConnection();

$zapas = new Zapas($db);

$data = json_decode(file_get_contents("php://input"));

$zapas->vysledek = $data->result;
$zapas->datum_a_cas_konani = $data->date;
$zapas->id_turnaj = $data->id_tourney;
$zapas->nazev_tymu = $data->name1;
$zapas->nazev_druheho_tymu = $data->name2;



if($zapas->create()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>