<?php
class SignIn{

    private $conn;

    public $prezdivka;
    public $heslo;

    public function __construct($db){
        $this->conn = $db;
    }

    function signIn(){
           $stmt = $this->conn->prepare("SELECT * FROM uzivatel WHERE prezdivka = :prezdivka AND heslo = :heslo");

           $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));
           $stmt->bindParam(":heslo", htmlspecialchars(strip_tags($this->heslo)));

           $stmt->execute();
           return $stmt;
    }
}