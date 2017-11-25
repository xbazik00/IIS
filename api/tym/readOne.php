<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/tym.php';
include_once '../objects/uzivatele_v_tymech.php';
include_once '../objects/uzivatel.php';

$database = new Database();
$db = $database->getConnection();
$tym = new Tym($db);
$uzivatele_v_tymech = new UzivateleVTymech($db);
$uzivatel = new Uzivatel($db);

$data = json_decode(file_get_contents("php://input"));

$tym->nazev_tymu = $data->name;
$uzivatele_v_tymech->nazev_tymu = $data->name;

$stmt = $tym->readOne();
$num = $stmt->rowCount();

$stmt1 = $uzivatele_v_tymech->getUsers();
$num1 = $stmt1->rowCount();

if($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $tym=array(
        "name" => $nazev_tymu,
        "number_of_players" => $pocet_hracu,
        "game" => $nazev_hry,
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
                    "clan" => $tym["name"]
                );

                array_push($tym["users"], $uzivatel_item);
            }
        }
    }
    
    echo json_encode($tym);
} else {
    echo json_encode(
        array("error" => "tym neexistuje.")
    );
}
?>