<?php
class Trener{

    private $conn;

    public $prezdivka;
    public $poznamky;

    public function __construct($db){
        $this->conn = $db;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM trener WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        // update query
        $stmt = $this->conn->prepare("INSERT INTO trener SET prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }

    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM trener WHERE prezdivka=:prezdivka");

        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();
     
        return $stmt;
    }

    function update(){
        $stmt = $this->conn->prepare("SELECT * FROM trener WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return true;
        }

        // update query
        $stmt = $this->conn->prepare("UPDATE trener SET poznamky=:poznamky WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));
        $stmt->bindParam(":poznamky", htmlspecialchars(strip_tags($this->poznamky)));

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }

    }



    
}
?>