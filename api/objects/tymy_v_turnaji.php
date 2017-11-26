<?php
class TymyVTurnaji{

    private $conn;

    public $id_turnaj;
    public $nazev_tymu;

    public function __construct($db){
        $this->conn = $db;
    }

    function getNazevTymu(){
        $stmt = $this->conn->prepare("SELECT * FROM tymy_v_turnaji WHERE id_turnaj=:id_turnaj");

        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));

        $stmt->execute();
     
        return $stmt;
    }

    function getTurnaj(){
        $stmt = $this->conn->prepare("SELECT * FROM tymy_v_turnaji WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));

        $stmt->execute();
     
        return $stmt;
    }

    function deleteByIdTurnaj(){
        $stmt = $this->conn->prepare("DELETE FROM tymy_v_turnaji WHERE id_turnaj=:id_turnaj");

        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function deleteByNazevTymu(){
        $stmt = $this->conn->prepare("DELETE FROM tymy_v_turnaji WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function deleteOne(){
        $stmt = $this->conn->prepare("DELETE FROM tymy_v_turnaji WHERE nazev_tymu=:nazev_tymu AND id_turnaj=:id_turnaj");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function add(){
        $stmt = $this->conn->prepare("SELECT * FROM turnaj WHERE id=:id_turnaj");
        
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
        
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


        $stmt = $this->conn->prepare("INSERT INTO tymy_v_turnaji SET nazev_tymu=:nazev_tymu, id_turnaj=:id_turnaj");
        
        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
        
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}