<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/uzivatel.php';
include_once '../objects/uzivatele_v_klanu.php';
include_once '../objects/klan.php';
include_once '../objects/pozvanka_do_klanu.php';

$database = new Database();
$db = $database->getConnection();

$uzivatel = new Uzivatel($db);
$uzivatele_v_klanu = new UzivateleVKlanu($db);
$klan = new Klan($db);
$pozvanka_do_klanu = new PozvankaDoKlanu($db);

$data = json_decode(file_get_contents("php://input"));

$uzivatel->prezdivka = $data->userName;

$flag = false;

if($uzivatel->deleteOne()){

    $uzivatele_v_klanu->prezdivka_uzivatele = $data->userName;

    $stmt = $uzivatele_v_klanu->getTagKlanu();

    if ($stmt->rowCount() > 0) {

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);

        $uzivatele_v_klanu->tag_klanu = $tag_klanu;
        $klan->tag = $tag_klanu;
        $pozvanka_do_klanu->tag_klanu = $tag_klanu;

        $stmt = $klan->readOne();

        if ($stmt->rowCount() > 0) {
            
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);

            if ($uzivatel->prezdivka == $vudce_klanu){
                if ($uzivatele_v_klanu->deleteByTag() && $klan->delete() && $pozvanka_do_klanu->deleteByTag()) {
                    $flag = true;
                }
            }else{
                $flag = true;
            }
        }else{
            $flag = true;
        }
    } else {
        $flag = true;
    }
}

if ($flag){
    echo '{';
        echo '"message": "OK"';
    echo '}';
}else{
    echo '{';
        echo '"message": "ERR"';
    echo '}';
}


?>