<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/organizator_turnaje.php';

$database = new Database();
$db = $database->getConnection();
$organizator_turnaje = new OrganizatorTurnaje($db);
$stmt = $organizator_turnaje->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $organizator_turnaje_item=array(
        "id" => $id,
        "name" => $jmeno,
        "phone" => $tel_cislo
    );

    array_push($arr["items"], $organizator_turnaje_item);
}

echo json_encode($arr);
?>