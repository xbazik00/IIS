<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/pozvanka_do_tymu.php';
include_once '../objects/uzivatele_v_tymech.php';

$database = new Database();
$db = $database->getConnection();
 
$pozvanka_do_tymu = new PozvankaDoTymu($db);
$uzivatele_v_tymu = new UzivateleVTymech($db);

$data = json_decode(file_get_contents("php://input"));

$pozvanka_do_tymu->nazev_tymu = $data->name;
$pozvanka_do_tymu->prezdivka_uzivatele = $data->userName;

$uzivatele_v_tymu->nazev_tymu = $data->name;
$uzivatele_v_tymu->prezdivka_uzivatele = $data->userName;

if($uzivatele_v_tymu->add()){
    if($pozvanka_do_tymu->delete()){
        echo '{';
            echo '"message": "OK"';
        echo '}';
    }
    else{
        echo '{';
            echo '"message": "ERR"';
        echo '}';
    }
}else{
    echo '{';
        echo '"message": "EXISTS"';
    echo '}';
}
?>