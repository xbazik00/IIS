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
}