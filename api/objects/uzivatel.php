<?php
class Uzivatel{

    private $conn;

    public $prezdivka;
    public $jmeno;
    public $prijmeni;
    public $zeme_puvodu;
    public $role;
    public $heslo;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
           $stmt = $this->conn->prepare("SELECT * FROM uzivatel");

           $stmt->execute();
        
           return $stmt;
    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatel WHERE prezdivka=:prezdivka");

        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();
     
        return $stmt;
    }
}