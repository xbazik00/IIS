<?php
class Zapas{

    private $conn;

    public $id;
    public $vysledek;
    public $datum_a_cas_konani;
    public $id_turnaj;
    public $nazev_tymu;
    public $nazev_druheho_tymu;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
           $stmt = $this->conn->prepare("SELECT * FROM zapas");

           $stmt->execute();
        
           return $stmt;
    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM zapas WHERE id=:id");

        $stmt->bindParam(":id", htmlspecialchars(strip_tags($this->id)));

        $stmt->execute();
     
        return $stmt;
    }

    function readByTurnaj(){
        $stmt = $this->conn->prepare("SELECT * FROM zapas WHERE id_turnaj=:id_turnaj");

        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));

        $stmt->execute();
     
        return $stmt;
    }

    function create(){
        $stmt = $this->conn->prepare("INSERT INTO zapas SET vysledek=:vysledek, datum_a_cas_konani=:datum_a_cas_konani, id_turnaj=:id_turnaj, nazev_tymu=:nazev_tymu, nazev_druheho_tymu=:nazev_druheho_tymu");
        
        $stmt->bindParam(":vysledek", htmlspecialchars(strip_tags($this->vysledek)));
        $stmt->bindParam(":datum_a_cas_konani", htmlspecialchars(strip_tags($this->datum_a_cas_konani)));
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":nazev_druheho_tymu", htmlspecialchars(strip_tags($this->nazev_druheho_tymu)));

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    function deleteByTurnaj(){
        $stmt = $this->conn->prepare("DELETE FROM zapas WHERE id_turnaj=:id_turnaj");
        
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));        
    
        if($stmt->execute()){
            return true;
        }
    
        return false;

    }

    function deleteOne(){
        $stmt = $this->conn->prepare("DELETE FROM zapas WHERE id=:id");

        $stmt->bindParam(":id", htmlspecialchars(strip_tags($this->id)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }


}
?>