<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/pozvanka_do_klanu.php';

$database = new Database();
$db = $database->getConnection();
$pozvanka_do_klanu = new PozvankaDoKlanu($db);

$data = json_decode(file_get_contents("php://input"));

$pozvanka_do_klanu->prezdivka_uzivatele = $data->userName;

$stmt = $pozvanka_do_klanu->getPozvankyByPrezdivka();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $pozvanka_do_klanu_item=array(
        "tag" => $tag_klanu,
        "userName" => $prezdivka_uzivatele,
        "created" => $datum_a_cas_odeslani
    );

    array_push($arr["items"], $pozvanka_do_klanu_item);
}

echo json_encode($arr);
?>