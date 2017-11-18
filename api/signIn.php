<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/database.php';
include_once './objects/signIn.php';
 
$database = new Database();
$db = $database->getConnection();

$signIn = new SignIn($db);
$data = json_decode(file_get_contents("php://input"));

$signIn->prezdivka = $data->userName;
$signIn->heslo = $data->password;

$stmt = $signIn->signIn();
$num = $stmt->rowCount();

if($num > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $uzivatel=array(
        "userName" => $prezdivka,
        "firstName" => $jmeno,
        "surname" => $prijmeni,
        "country" => $zeme_puvodu,
        "role" => $role,
        "password" => $heslo
    );
    
    echo json_encode($uzivatel);
} else {
    echo json_encode(
        array("error" => "Nesprávné uživatelské jméno nebo heslo.")
    );
}
?>