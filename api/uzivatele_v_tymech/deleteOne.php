<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/uzivatele_v_tymech.php';

$database = new Database();
$db = $database->getConnection();

$uzivatele_v_tymech = new UzivateleVTymech($db);

$data = json_decode(file_get_contents("php://input"));

$uzivatele_v_tymech->nazev_tymu = $data->name;
$uzivatele_v_tymech->prezdivka_uzivatele = $data->userName;

if($uzivatele_v_tymech->deleteOne()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>