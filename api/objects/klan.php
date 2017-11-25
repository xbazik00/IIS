<?php
class Klan{

    private $conn;

    public $tag;
    public $nazev;
    public $logo;
    public $hymna;
    public $zeme_pusobeni;
    public $vudce_klanu;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
           $stmt = $this->conn->prepare("SELECT * FROM klan");

           $stmt->execute();
        
           return $stmt;
    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM klan WHERE tag=:tag");

        $stmt->bindParam(":tag", htmlspecialchars(strip_tags($this->tag)));

        $stmt->execute();
     
        return $stmt;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM klan WHERE tag=:tag");
        
        $stmt->bindParam(":tag", htmlspecialchars(strip_tags($this->tag)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("SELECT * FROM uzivatele_v_klanu WHERE prezdivka_uzivatele=:prezdivka_uzivatele");
        
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->vudce_klanu)));

        $stmt->execute();
        
        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("INSERT INTO klan SET tag=:tag, nazev=:nazev, logo=:logo, hymna=:hymna, zeme_pusobeni=:zeme_pusobeni, vudce_klanu=:vudce_klanu");

        $stmt->bindParam(":tag", htmlspecialchars(strip_tags($this->tag)));
        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));
        $stmt->bindParam(":logo", htmlspecialchars(strip_tags($this->logo)));
        $stmt->bindParam(":hymna", htmlspecialchars(strip_tags($this->hymna)));
        $stmt->bindParam(":zeme_pusobeni", htmlspecialchars(strip_tags($this->zeme_pusobeni)));
        $stmt->bindParam(":vudce_klanu", htmlspecialchars(strip_tags($this->vudce_klanu)));

        $stmt2 = $this->conn->prepare("INSERT INTO uzivatele_v_klanu SET tag_klanu=:tag_klanu, prezdivka_uzivatele=:prezdivka_uzivatele");
        
        $stmt2->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag)));
        $stmt2->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->vudce_klanu)));

        if ($stmt->execute() && $stmt2->execute()){
            return true;
        }

        return false;
    }

    function delete(){
        $stmt = $this->conn->prepare("DELETE FROM klan WHERE tag=:tag");

        $stmt->bindParam(":tag", htmlspecialchars(strip_tags($this->tag)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    function update(){
        $stmt = $this->conn->prepare("SELECT * FROM klan WHERE tag=:tag");
        
        $stmt->bindParam(":tag", htmlspecialchars(strip_tags($this->tag)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }

        $stmt = $this->conn->prepare("SELECT * FROM uzivatel WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->vudce_klanu)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }

        $stmt = $this->conn->prepare("UPDATE klan SET vudce_klanu=:vudce_klanu, nazev=:nazev, logo=:logo, hymna=:hymna, zeme_pusobeni=:zeme_pusobeni WHERE tag=:tag");

        $stmt->bindParam(":tag", htmlspecialchars(strip_tags($this->tag)));
        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));
        $stmt->bindParam(":logo", htmlspecialchars(strip_tags($this->logo)));
        $stmt->bindParam(":hymna", htmlspecialchars(strip_tags($this->hymna)));
        $stmt->bindParam(":zeme_pusobeni", htmlspecialchars(strip_tags($this->zeme_pusobeni)));
        $stmt->bindParam(":vudce_klanu", htmlspecialchars(strip_tags($this->vudce_klanu)));
        
        if ($stmt->execute()){
            return true;
        }

        return false;
    }
}