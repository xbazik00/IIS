<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/hra.php';

$database = new Database();
$db = $database->getConnection();
$hra = new Hra($db);
$stmt = $hra->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $hra_item=array(
        "name" => $nazev,
        "created" => $datum_vydani,
        "genre" => $zanr,
        "modes" => $mody,
        "publisher" => $vydavatel
    );

    array_push($arr["items"], $hra_item);
}

echo json_encode($arr);
?>