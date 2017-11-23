<?php
class PozvankaDoTymu{

    private $conn;

    public $nazev_tymu;
    public $prezdivka_uzivatele;
    public $datum_a_cas_odeslani;
    public $stav = 0;

    public function __construct($db){
        $this->conn = $db;
    }

    function getPozvankyByPrezdivka(){
        $stmt = $this->conn->prepare("SELECT * FROM pozvanka_do_tymu WHERE prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));

        $stmt->execute();
     
        return $stmt;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatel WHERE prezdivka=:prezdivka_uzivatele");
        
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }

        
        $stmt = $this->conn->prepare("SELECT * FROM tym WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }

        $stmt = $this->conn->prepare("SELECT * FROM uzivatele_v_tymech WHERE nazev_tymu=:nazev_tymu AND prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("SELECT * FROM pozvanka_do_tymu WHERE nazev_tymu=:nazev_tymu AND prezdivka_uzivatele=:prezdivka_uzivatele AND stav=:stav");
        
        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
        $stmt->bindParam(":stav", htmlspecialchars(strip_tags($this->stav)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }
        
        $stmt = $this->conn->prepare("INSERT INTO pozvanka_do_tymu SET nazev_tymu=:nazev_tymu, prezdivka_uzivatele=:prezdivka_uzivatele, stav=:stav");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
        $stmt->bindParam(":stav", htmlspecialchars(strip_tags($this->stav)));
        
        if ($stmt->execute()){
            return true;
        }
        
        return false;
    }

    function deleteByNazevTymu(){
        $stmt = $this->conn->prepare("DELETE FROM pozvanka_do_tymu WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function delete(){
        $stmt = $this->conn->prepare("DELETE FROM pozvanka_do_tymu WHERE nazev_tymu=:nazev_tymu AND prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
        

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}