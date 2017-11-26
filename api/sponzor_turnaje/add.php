<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/sponzor_turnaje.php';
include_once '../objects/sponzor.php';
include_once '../objects/klan.php';


 
$database = new Database();
$db = $database->getConnection();
 
$sponzor_turnaje = new SponzorTurnaje($db);
$sponzor = new Sponzor($db);

$data = json_decode(file_get_contents("php://input"));

$sponzor_turnaje->zkratka_sponzora = $data->acronym;
$sponzor_turnaje->id_turnaj = $data->id;

$sponzor->zkratka = $data->acronym;

$stmt = $sponzor->readOne();
$num = $stmt->rowCount();

if($num > 0){
    if($sponzor_turnaje->create()){
        echo '{';
            echo '"message": "OK"';
        echo '}';
    }else{
        echo '{';
            echo '"message": "EXISTS"';
        echo '}';
    }
}
else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}





?>