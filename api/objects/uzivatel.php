<?php
class Uzivatel{

    private $conn;
    private $table_name = "uzivatel";

    public $prezdivka;
    public $jmeno;
    public $prijmeni;
    public $zeme_puvodu;
    public $role;
    public $password;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
           $stmt = $this->conn->prepare("SELECT * FROM uzivatel");

           $stmt->execute();
        
           return $stmt;
       }
}