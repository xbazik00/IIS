<?php
class Trener{

    private $conn;

    public $prezdivka;
    public $poznamky;

    public function __construct($db){
        $this->conn = $db;
    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM trener WHERE prezdivka=:prezdivka");

        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();
     
        return $stmt;
    }

    
}
?>