<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/uzivatel.php';
include_once '../objects/uzivatele_v_klanu.php';
include_once '../objects/trener.php';
include_once '../objects/hrac.php';


$database = new Database();
$db = $database->getConnection();
$uzivatel = new Uzivatel($db);
$uzivatele_v_klanu = new UzivateleVKlanu($db);
$trener = new Trener($db);
$hrac = new Hrac($db);

$data = json_decode(file_get_contents("php://input"));

$uzivatel->prezdivka = $data->userName;
$uzivatele_v_klanu->prezdivka_uzivatele = $data->userName;
$trener->prezdivka = $data->userName;
$hrac->prezdivka = $data->userName;

$stmt = $uzivatel->readOne();
$num = $stmt->rowCount();

$stmt1 = $uzivatele_v_klanu->getTagKlanu();
$num1 = $stmt1->rowCount();

$stmt2 = $trener->readOne();
$num2 = $stmt2->rowCount();

$stmt3 = $hrac->readOne();
$num3 = $stmt3->rowCount();

if($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $uzivatel=array(
        "userName" => $prezdivka,
        "firstName" => $jmeno,
        "surname" => $prijmeni,
        "country" => $zeme_puvodu,
        "role" => $role,
        "password" => $heslo,
        "clan" => null
    );
    
    if ($num1 > 0){
        $row = $stmt1->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $uzivatel["clan"] = $tag_klanu;
    }

    if ($num2 > 0){
        $row = $stmt2->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $uzivatel["notes"] = $poznamky;
    }
    
    if ($num3 > 0){
        $row = $stmt3->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $uzivatel["mouse"] = $herni_mys;
        $uzivatel["keyboard"] = $klavesnice;
    }

    echo json_encode($uzivatel);
} else {
    echo json_encode(
        array("error" => "Uživatel neexistuje.")
    );
}
?>