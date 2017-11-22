<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/sponzor.php';

$database = new Database();
$db = $database->getConnection();
$sponzor = new Sponzor($db);
$stmt = $sponzor->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $sponzor_item=array(
        "acronym" => $zkratka,
        "name" => $nazev,
        "seat" => $sidlo,
        "account_number" => $cislo_uctu
    );

    array_push($arr["items"], $sponzor_item);
}

echo json_encode($arr);
?>