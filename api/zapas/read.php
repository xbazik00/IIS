<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/zapas.php';

$database = new Database();
$db = $database->getConnection();
$zapas = new Zapas($db);
$stmt = $zapas->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $zapas_item=array(
        "id" => $id,
        "result" => $vysledek,
        "date" => $datum_a_cas_konani,
        "id_tourney" => $id_turnaj,
        "name1" => $nazev_tymu,
        "name2" => $nazev_druheho_tymu
    );

    array_push($arr["items"], $zapas_item);
}

echo json_encode($arr);
?>