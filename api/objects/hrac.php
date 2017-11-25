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

    function update(){
        $stmt = $this->conn->prepare("SELECT * FROM hrac WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return true;
        }

        // update query
        $stmt = $this->conn->prepare("UPDATE hrac SET klavesnice=:klavesnice, herni_mys=:herni_mys WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));
        $stmt->bindParam(":klavesnice", htmlspecialchars(strip_tags($this->klavesnice)));
        $stmt->bindParam(":herni_mys", htmlspecialchars(strip_tags($this->herni_mys)));

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}
?>