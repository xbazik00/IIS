<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/tym.php';
include_once '../objects/uzivatele_v_tymech.php';
include_once '../objects/pozvanka_do_tymu.php';

$database = new Database();
$db = $database->getConnection();

$tym = new Tym($db);
$uzivatele_v_tymech = new UzivateleVTymech($db);
$pozvanka_do_tymu = new PozvankaDotymu($db);

$data = json_decode(file_get_contents("php://input"));

$tym->nazev_tymu = $data->name;
$uzivatele_v_tymech->nazev_tymu = $data->name;
$pozvanka_do_tymu->nazev_tymu = $data->name;

if($tym->delete() && $uzivatele_v_tymech->deleteByNazevTymu() && $pozvanka_do_tymu->deleteByNazevTymu()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>