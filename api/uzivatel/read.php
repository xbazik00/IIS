<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/uzivatel.php';
fwrite(fopen('php://stdout', 'w'), "\n\n\n\n\n\n\n\n\n\nSTART\n");
$database = new Database();
$db = $database->getConnection();
$uzivatel = new Uzivatel($db);
$stmt = $uzivatel->read();
$num = $stmt->rowCount();

if($num>0){

    $arr=array();
    $arr["items"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $uzivatel_item=array(
            "prezdivka" => $prezdivka,
            "jmeno" => $jmeno,
            "prijmeni" => $prijmeni,
            "zeme_puvodu" => $zeme_puvodu,
            "role" => $role,
            "password" => $password
        );
 
        array_push($arr["items"], $uzivatel_item);
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "Žádní uživatelé nenalezeni.")
    );
}
?>