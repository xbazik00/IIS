<?php
class UzivateleVTymech{

    private $conn;

    public $prezdivka_uzivatele;
    public $nazev_tymu;

    public function __construct($db){
        $this->conn = $db;
    }

    function getNazevTymu(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatele_v_tymech WHERE prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));

        $stmt->execute();
     
        return $stmt;
    }

    function getUsers(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatele_v_tymech WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));

        $stmt->execute();
     
        return $stmt;
    }

    function deleteByPrezdivka(){
        $stmt = $this->conn->prepare("DELETE FROM uzivatele_v_tymech WHERE prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function deleteByNazevTymu(){
        $stmt = $this->conn->prepare("DELETE FROM uzivatele_v_tymech WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function deleteOne(){
        $stmt = $this->conn->prepare("DELETE FROM uzivatele_v_tymech WHERE nazev_tymu=:nazev_tymu AND prezdivka_uzivatele=:prezdivka_uzivatele");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function add(){

        $stmt = $this->conn->prepare("INSERT INTO uzivatele_v_tymech SET nazev_tymu=:nazev_tymu, prezdivka_uzivatele=:prezdivka_uzivatele");
        
        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":prezdivka_uzivatele", htmlspecialchars(strip_tags($this->prezdivka_uzivatele)));
        
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}