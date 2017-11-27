<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/klan.php';

$database = new Database();
$db = $database->getConnection();
$klan = new Klan($db);
$stmt = $klan->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $klan_item=array(
        "tag" => $tag,
        "name" => $nazev,
        "logo" => $logo,
        "anthem" => $hymna,
        "country" => $zeme_pusobeni,
        "boss" => $vudce_klanu,
    );

    array_push($arr["items"], $klan_item);
}

echo json_encode($arr);
?>