<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/turnaj.php';
include_once '../objects/tymy_v_turnaji.php';
include_once '../objects/zapas.php';



$database = new Database();
$db = $database->getConnection();
$turnaj = new Turnaj($db);
$tymy_v_turnaji = new TymyVTurnaji($db);
$zapas = new Zapas($db);

$data = json_decode(file_get_contents("php://input"));

$turnaj->id = $data->id;
$tymy_v_turnaji->id_turnaj = $data->id;
$zapas->id_turnaj = $data->id;
$zapas->id = $data->id;

$stmt = $turnaj->readOne();
$num = $stmt->rowCount();

$stmt1 = $tymy_v_turnaji->getNazevTymu();
$num1 = $stmt1->rowCount();


$stmt2 = $zapas->readByTurnaj();
$num2 = $stmt2->rowCount();

if($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $turnaj_item=array(
        "id" => $id,
        "name" => $nazev,
        "date" => $datum_konani,
        "prize" => $hlavni_cena,
        "game" => $nazev_hry,
        "winner" => $vitez,
        "id_organizer" => $prezdivka_organizator_turnaje,
    );

    $turnaj_item["teams"] = array();

    while($row1 = $stmt1->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        
        $tym_item=array(
            "name" => $nazev_tymu,
            "number_of_players" => $pocet_hracu,
            "game" => $nazev_hry
        );

        array_push($turnaj_item["teams"],$tym_item);
    }
	
    $turnaj_item["matches"] = array();

    while($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
        extract($row2);
        
        $zapas_item=array(
            "id" => $id,
            "result" => $vysledek,
            "date" => $datum_a_cas_konani,
            "id_tourney" => $id_turnaj,
            "name1" => $nazev_tymu,
            "name2" => $nazev_druheho_tymu
        );

        array_push($turnaj_item["matches"],$zapas_item);
    }

    echo json_encode($turnaj_item);
} else {
    echo json_encode(
        array("error" => "Turnaj neexistuje.")
    );
}
?>