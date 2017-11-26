<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/tymy_v_turnaji.php';


 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare tymy_v_turnaji object
$tymy_v_turnaji = new TymyVTurnaji($db);


// get id of tymy_v_turnaji to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of tymy_v_turnaji to be edited
$tymy_v_turnaji->nazev_tymu = $data->name;
$tymy_v_turnaji->id_turnaj = $data->id;
 
// update the tymy_v_turnaji
if($tymy_v_turnaji->add()){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}
 
// if unable to update the tymy_v_turnaji, tell the user
else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}
?>