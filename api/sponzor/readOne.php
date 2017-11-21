<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../config/database.php';
include_once '../objects/sponzor.php';

$database = new Database();
$db = $database->getConnection();
$sponzor = new Sponzor($db);

$data = json_decode(file_get_contents("php://input"));

$sponzor->zkratka = $data->acronym;

$stmt = $sponzor->readOne();
$num = $stmt->rowCount();

if($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $sponzor=array(
        "acronym" => $zkratka,
        "name" => $nazev,
        "seat" => $sidlo,
        "account_number" => $cislo_uctu
    );

    
    echo json_encode($sponzor);
} else {
    echo json_encode(
        array("error" => "Sponzor neexistuje.")
    );
}
?>