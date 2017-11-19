<?php
class UzivateleVKlanu{

    private $conn;

    public $prezdivka_uzivatele;
    public $tag_klanu;

    public function __construct($db){
        $this->conn = $db;
    }

    function getTagKlanu(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatele_v_klanu WHERE prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));

        $stmt->execute();
     
        return $stmt;
    }

    function getUsers(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatele_v_klanu WHERE tag_klanu=:tag_klanu");

        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));

        $stmt->execute();
     
        return $stmt;
    }
}