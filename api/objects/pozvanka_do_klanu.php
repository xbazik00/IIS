<?php
class PozvankaDoKlanu{

    private $conn;

    public $tag_klanu;
    public $prezdivka_uzivatele;
    public $datum_a_cas_odeslani;
    public $stav = 0;

    public function __construct($db){
        $this->conn = $db;
    }

    function getPozvankyByPrezdivka(){
        $stmt = $this->conn->prepare("SELECT * FROM pozvanka_do_klanu WHERE prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));

        $stmt->execute();
     
        return $stmt;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatele_v_klanu WHERE tag_klanu=:tag_klanu AND prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("SELECT * FROM pozvanka_do_klanu WHERE tag_klanu=:tag_klanu AND prezdivka_uzivatele=:prezdivka_uzivatele AND stav=:stav");
        
        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
        $stmt->bindParam(":stav", htmlspecialchars(strip_tags($this->stav)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }
        
        $stmt = $this->conn->prepare("INSERT INTO pozvanka_do_klanu SET tag_klanu=:tag_klanu, prezdivka_uzivatele=:prezdivka_uzivatele, stav=:stav");

        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
        $stmt->bindParam(":stav", htmlspecialchars(strip_tags($this->stav)));
        
        if ($stmt->execute()){
            return true;
        }
        
        return false;
    }

    function deleteByTag(){
        $stmt = $this->conn->prepare("DELETE FROM pozvanka_do_klanu WHERE tag_klanu=:tag_klanu");

        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function delete(){
        $stmt = $this->conn->prepare("DELETE FROM pozvanka_do_klanu WHERE tag_klanu=:tag_klanu AND prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
        

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}