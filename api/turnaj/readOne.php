<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/turnaj.php';
include_once '../objects/tymy_v_turnaji.php';


$database = new Database();
$db = $database->getConnection();
$turnaj = new Turnaj($db);
$tymy_v_turnaji = new TymyVTurnaji($db);

$data = json_decode(file_get_contents("php://input"));

$turnaj->id = $data->id;
$tymy_v_turnaji->id_turnaj = $data->id;

$stmt = $turnaj->readOne();
$num = $stmt->rowCount();

$stmt1 = $tymy_v_turnaji->getNazevTymu();
$num1 = $stmt1->rowCount();

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
        
        array_push($turnaj_item["teams"],$nazev_tymu);
    }

    echo json_encode($turnaj_item);
} else {
    echo json_encode(
        array("error" => "Turnaj neexistuje.")
    );
}
?>