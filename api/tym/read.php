<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/tym.php';

$database = new Database();
$db = $database->getConnection();
$tym = new Tym($db);
$stmt = $tym->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $tym_item=array(
        "name" => $nazev_tymu,
        "number_of_players" => $pocet_hracu,
        "game" => $nazev_hry,
    );

    array_push($arr["items"], $tym_item);
}

echo json_encode($arr);
?>