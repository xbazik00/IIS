<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/uzivatele_v_klanu.php';

$database = new Database();
$db = $database->getConnection();

$uzivatele_v_klanu = new UzivateleVKlanu($db);

$data = json_decode(file_get_contents("php://input"));

$uzivatele_v_klanu->tag_klanu = $data->tag;
$uzivatele_v_klanu->prezdivka_uzivatele = $data->userName;

if($uzivatele_v_klanu->deleteOne()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>