<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/tym.php';
include_once '../objects/uzivatele_v_tymech.php';

$database = new Database();
$db = $database->getConnection();
$tym = new Tym($db);
$uzivatele_v_tymech = new UzivateleVTymech($db);

$data = json_decode(file_get_contents("php://input"));

$uzivatele_v_tymech->prezdivka_uzivatele = $data->userName;

$stmt = $uzivatele_v_tymech->getNazevTymu();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $tym->nazev_tymu = $nazev_tymu;
    $stmt1 = $tym->readOne();

    $row1 = $stmt1->fetch(PDO::FETCH_ASSOC);
    extract($row1);


    $tym_item=array(
        "name" => $nazev_tymu,
        "number_of_players" => $pocet_hracu,
        "game" => $nazev_hry
    );

    array_push($arr["items"], $tym_item);
}

echo json_encode($arr);
?>