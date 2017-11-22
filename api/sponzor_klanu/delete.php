<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/sponzor_klanu.php';


 
$database = new Database();
$db = $database->getConnection();
 
$sponzor_klanu = new Sponzor_klanu($db);

$data = json_decode(file_get_contents("php://input"));

$sponzor_klanu->zkratka_sponzora = $data->acronym;
$sponzor_klanu->tag_klanu = $data->tag;


if($sponzor_klanu->delete()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}

