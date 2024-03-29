<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/uzivatel.php';
include_once '../objects/hrac.php';
include_once '../objects/trener.php';
include_once '../objects/organizator_turnaje.php';

 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare uzivatel object
$uzivatel = new Uzivatel($db);
$hrac = new Hrac($db);
$trener = new Trener($db);
$organizator_turnaje = new OrganizatorTurnaje($db);

// get id of uzivatel to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of uzivatel to be edited
$uzivatel->prezdivka = $data->nick;

// set uzivatel property values
$uzivatel->jmeno = $data->name;
$uzivatel->prijmeni = $data->surname;
$uzivatel->zeme_puvodu = $data->country;
$uzivatel->role = $data->role;
$uzivatel->heslo = $data->password;

if($data->role == "COACH"){
    $trener->prezdivka = $data->nick;
    $trener->poznamky = $data->notes;
}

if($data->role == "PLAYER"){    
    $hrac->prezdivka = $data->nick;
    $hrac->herni_mys = $data->mouse;
    $hrac->klavesnice = $data->keyboard;
}

if($data->role == "ORGANIZER"){    
    $organizator_turnaje->prezdivka = $data->nick;
    $organizator_turnaje->jmeno = $data->org_name;
    $organizator_turnaje->tel_cislo = $data->phone;
}

$flag = $uzivatel->update();

if($flag and $uzivatel->role == "PLAYER"){
    $flag = $hrac->update();
}

if($flag and $uzivatel->role == "COACH"){
    $flag = $trener->update();
}

if($flag and $uzivatel->role == "ORGANIZER"){
    $flag = $organizator_turnaje->update();
}
 
// update the uzivatel
if($flag){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}
 
// if unable to update the uzivatel, tell the user
else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>