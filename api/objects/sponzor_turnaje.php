<?php
class SponzorTurnaje{

    private $conn;
    public $id_turnaj;
    public $zkratka_sponzora;

    public function __construct($db){
        $this->conn = $db;
    }

    function getSponzorAcronym(){
        $stmt = $this->conn->prepare("SELECT * FROM sponzor_turnaje WHERE id_turnaj=:id_turnaj");
        
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
            
        $stmt->execute();
    
        return $stmt;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM sponzor_turnaje WHERE zkratka_sponzora=:zkratka_sponzora AND id_turnaj=:id_turnaj");
        
        $stmt->bindParam(":zkratka_sponzora", htmlspecialchars(strip_tags($this->zkratka_sponzora)));
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
        
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("INSERT INTO sponzor_turnaje SET zkratka_sponzora=:zkratka_sponzora, id_turnaj=:id_turnaj");

        $stmt->bindParam(":zkratka_sponzora", htmlspecialchars(strip_tags($this->zkratka_sponzora)));
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    function delete(){
        $stmt = $this->conn->prepare("DELETE FROM sponzor_turnaje WHERE zkratka_sponzora=:zkratka_sponzora AND id_turnaj=:id_turnaj");

        $stmt->bindParam(":zkratka_sponzora", htmlspecialchars(strip_tags($this->zkratka_sponzora)));
        $stmt->bindParam(":id_turnaj", htmlspecialchars(strip_tags($this->id_turnaj)));
    
        if ($stmt->execute()){
            return true;
        }

        return false;
        
    }

}
?>