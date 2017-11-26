<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/turnaj.php';

$database = new Database();
$db = $database->getConnection();
$turnaj = new Turnaj($db);
$stmt = $turnaj->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $turnaj_item=array(
        "id" => $id,
        "name" => $nazev,
        "date" => $datum_konani,
        "prize" => $hlavni_cena,
        "game" => $nazev_hry,
        "winner" => $vitez,
        "id_organizer" => $id_organizator_turnaje
    );

    array_push($arr["items"], $turnaj_item);
}

echo json_encode($arr);
?>