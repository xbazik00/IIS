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

    function deleteOne(){
        $stmt = $this->conn->prepare("DELETE FROM uzivatel WHERE prezdivka=:prezdivka");

        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatel WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("INSERT INTO uzivatel SET prezdivka=:prezdivka, jmeno=:jmeno, prijmeni=:prijmeni, zeme_puvodu=:zeme_puvodu, role=:role, heslo=:heslo");

        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));
        $stmt->bindParam(":jmeno", htmlspecialchars(strip_tags($this->jmeno)));
        $stmt->bindParam(":prijmeni", htmlspecialchars(strip_tags($this->prijmeni)));
        $stmt->bindParam(":zeme_puvodu", htmlspecialchars(strip_tags($this->zeme_puvodu)));
        $stmt->bindParam(":role", htmlspecialchars(strip_tags($this->role)));
        $stmt->bindParam(":heslo", htmlspecialchars(strip_tags($this->heslo)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    // update the product
    function update(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatel WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }
    
        // update query
        $stmt = $this->conn->prepare("UPDATE uzivatel SET jmeno=:jmeno, prijmeni=:prijmeni, zeme_puvodu=:zeme_puvodu, role=:role, heslo=:heslo WHERE prezdivka=:prezdivka");
    
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));
        $stmt->bindParam(":jmeno", htmlspecialchars(strip_tags($this->jmeno)));
        $stmt->bindParam(":prijmeni", htmlspecialchars(strip_tags($this->prijmeni)));
        $stmt->bindParam(":zeme_puvodu", htmlspecialchars(strip_tags($this->zeme_puvodu)));
        $stmt->bindParam(":role", htmlspecialchars(strip_tags($this->role)));
        $stmt->bindParam(":heslo", htmlspecialchars(strip_tags($this->heslo)));
        
        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

}