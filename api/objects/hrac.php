<?php
class Hrac{

    private $conn;

    public $prezdivka;
    public $herni_mys;
    public $klavesnice;

    public function __construct($db){
        $this->conn = $db;
    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM hrac WHERE prezdivka=:prezdivka");

        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();
     
        return $stmt;
    }

    
}
?>