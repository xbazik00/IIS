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

    function deleteOne(){
        $stmt = $this->conn->prepare("DELETE FROM hra WHERE nazev=:nazev");

        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM hra WHERE nazev=:nazev");
        
        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("INSERT INTO hra SET nazev=:nazev, datum_vydani=:datum_vydani, zanr=:zanr, mody=:mody, vydavatel=:vydavatel");

        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));
        $stmt->bindParam(":datum_vydani", htmlspecialchars(strip_tags($this->datum_vydani)));
        $stmt->bindParam(":zanr", htmlspecialchars(strip_tags($this->zanr)));
        $stmt->bindParam(":mody", htmlspecialchars(strip_tags($this->mody)));
        $stmt->bindParam(":vydavatel", htmlspecialchars(strip_tags($this->vydavatel)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }
}