<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/sponzor.php';
include_once '../objects/sponzor_klanu.php';

$database = new Database();
$db = $database->getConnection();
$sponzor = new Sponzor($db);

$sponzor_klanu = new Sponzor_klanu($db);

$data = json_decode(file_get_contents("php://input"));

$sponzor_klanu->tag_klanu = $data->tag;

$stmt = $sponzor_klanu->getSponzorAcronym();
$num = $stmt->rowCount();

$arr=array();
$arr["items"]=array();
$arr["count"]=$num;

while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $sponzor->zkratka = $zkratka_sponzora;
    $stmt1 = $sponzor->readOne();
    $num1 = $stmt1->rowCount();

    if($num1 > 0) {
        $row1 = $stmt1->fetch(PDO::FETCH_ASSOC);
        extract($row1);
    
        $sponzor_item=array(
            "acronym" => $zkratka,
            "name" => $nazev,
            "seat" => $sidlo,
            "account_number" => $cislo_uctu
        );
        array_push($arr["items"], $sponzor_item);
    }
}

echo json_encode($arr);
?>