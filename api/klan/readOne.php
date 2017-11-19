<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/klan.php';
include_once '../objects/uzivatele_v_klanu.php';
include_once '../objects/uzivatel.php';

$database = new Database();
$db = $database->getConnection();
$klan = new Klan($db);
$uzivatele_v_klanu = new UzivateleVKlanu($db);
$uzivatel = new Uzivatel($db);

$data = json_decode(file_get_contents("php://input"));

$klan->tag = $data->tag;
$uzivatele_v_klanu->tag_klanu = $data->tag;

$stmt = $klan->readOne();
$num = $stmt->rowCount();

$stmt1 = $uzivatele_v_klanu->getUsers();
$num1 = $stmt1->rowCount();

if($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $klan=array(
        "tag" => $tag,
        "name" => $nazev,
        "logo" => $logo,
        "anthem" => $hymna,
        "country" => $zeme_pusobeni,
        "boss" => $vudce_klanu,
        "users" => array()
    );
    
    if ($num1 > 0){
        while ($row = $stmt1->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $uzivatel->prezdivka = $prezdivka_uzivatele;
            $stmt = $uzivatel->readOne();
            $num = $stmt->rowCount();

            if ($num > 0){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                extract($row);

                $uzivatel_item=array(
                    "userName" => $prezdivka,
                    "firstName" => $jmeno,
                    "surname" => $prijmeni,
                    "country" => $zeme_puvodu,
                    "role" => $role,
                    "clan" => $klan["tag"]
                );

                array_push($klan["users"], $uzivatel_item);
            }
        }
    }
    
    echo json_encode($klan);
} else {
    echo json_encode(
        array("error" => "Klan neexistuje.")
    );
}
?>