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


 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare uzivatel object
$uzivatel = new Uzivatel($db);
$hrac = new Hrac($db);
$trener = new Trener($db);

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

$trener->prezdivka = $data->nick;
$trener->poznamky = $data->notes;

$hrac->prezdivka = $data->nick;
$hrac->herni_mys = $data->mouse;
$hrac->klavesnice = $data->keyboard;


 
// update the uzivatel
if($uzivatel->update() && $trener->update() && $hrac->update()){
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