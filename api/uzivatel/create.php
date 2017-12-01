<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/uzivatel.php';
include_once '../objects/hrac.php';
include_once '../objects/trener.php';
include_once '../objects/organizator_turnaje.php';
 
$database = new Database();
$db = $database->getConnection();
 
$uzivatel = new Uzivatel($db);
$hrac = new Hrac($db);
$trener = new Trener($db);
$organizator_turnaje = new OrganizatorTurnaje($db);

$data = json_decode(file_get_contents("php://input"));

$uzivatel->prezdivka = $data->nick;
$uzivatel->jmeno = $data->name;
$uzivatel->prijmeni = $data->surname;
$uzivatel->zeme_puvodu = $data->country;
$uzivatel->role = $data->role;
$uzivatel->heslo = $data->password;

$hrac->prezdivka = $data->nick;

$trener->prezdivka = $data->nick;

$organizator_turnaje->prezdivka = $data->nick;

$flag = $uzivatel->create();

if($flag and $uzivatel->role == "PLAYER"){
    $flag = $hrac->create();
}

if($flag and $uzivatel->role == "COACH"){
    $flag = $trener->create();
}

if($flag and $uzivatel->role == "ORGANIZER"){
    $flag = $organizator_turnaje->create();
}


if($flag){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>