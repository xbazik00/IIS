<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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
        "clan" => null
    );

    $uzivatele_v_klanu->prezdivka_uzivatele = $prezdivka;
    $trener->prezdivka = $prezdivka;
    $hrac->prezdivka = $prezdivka;
    

    $stmt1 = $uzivatele_v_klanu->getTagKlanu();
    $num1 = $stmt1->rowCount();

    $stmt2 = $trener->readOne();
    $num2 = $stmt2->rowCount();
    
    $stmt3 = $hrac->readOne();
    $num3 = $stmt3->rowCount();

    if ($num1 > 0){
        $row = $stmt1->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $uzivatel_item["clan"] = $tag_klanu;
    }

    if ($num2 > 0){
        $row = $stmt2->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $uzivatel_item["notes"] = $poznamky;
    }
    
    if ($num3 > 0){
        $row = $stmt3->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $uzivatel_item["mouse"] = $herni_mys;
        $uzivatel_item["keyboard"] = $klavesnice;
    }


    array_push($arr["items"], $uzivatel_item);
}

echo json_encode($arr);
?>