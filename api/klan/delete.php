<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/klan.php';
include_once '../objects/uzivatele_v_klanu.php';
include_once '../objects/pozvanka_do_klanu.php';

$database = new Database();
$db = $database->getConnection();

$klan = new Klan($db);
$uzivatele_v_klanu = new UzivateleVKlanu($db);
$pozvanka_do_klanu = new PozvankaDoKlanu($db);

$data = json_decode(file_get_contents("php://input"));

$klan->tag = $data->tag;
$uzivatele_v_klanu->tag_klanu = $data->tag;
$pozvanka_do_klanu->tag_klanu = $data->tag;

if($klan->delete() && $uzivatele_v_klanu->deleteByTag() && $pozvanka_do_klanu->deleteByTag()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>