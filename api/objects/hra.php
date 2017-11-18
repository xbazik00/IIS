<?php
class Hra{

    private $conn;

    public $nazev;
    public $datum_vydani;
    public $zanr;
    public $mody;
    public $vydavatel;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
           $stmt = $this->conn->prepare("SELECT * FROM hra");

           $stmt->execute();
        
           return $stmt;
       }
}