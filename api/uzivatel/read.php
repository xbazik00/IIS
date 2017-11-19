<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/uzivatel.php';

$database = new Database();
$db = $database->getConnection();
$uzivatel = new Uzivatel($db);
$stmt = $uzivatel->read();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $uzivatel_item=array(
        "userName" => $prezdivka,
        "firstName" => $jmeno,
        "surname" => $prijmeni,
        "country" => $zeme_puvodu,
        "role" => $role,
        "password" => $heslo
    );

    array_push($arr["items"], $uzivatel_item);
}

echo json_encode($arr);
?>