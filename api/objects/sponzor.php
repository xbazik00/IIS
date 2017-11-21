<?php
class Sponzor{

    private $conn;

    public $zkratka;
    public $nazev;
    public $sidlo;
    public $cislo_uctu;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
        $stmt = $this->conn->prepare("SELECT * FROM sponzor");

        $stmt->execute();
    
        return $stmt;
    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM sponzor WHERE zkratka=:zkratka");
        
        $stmt->bindParam(":zkratka", htmlspecialchars(strip_tags($this->zkratka)));
            
        $stmt->execute();
    
        return $stmt;
    }


    function deleteOne(){
        $stmt = $this->conn->prepare("DELETE FROM sponzor WHERE zkratka=:zkratka");

        $stmt->bindParam(":zkratka", htmlspecialchars(strip_tags($this->zkratka)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM sponzor WHERE zkratka=:zkratka");
        
        $stmt->bindParam(":zkratka", htmlspecialchars(strip_tags($this->zkratka)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("INSERT INTO sponzor SET zkratka=:zkratka, nazev=:nazev, sidlo=:sidlo, cislo_uctu=:cislo_uctu");

        $stmt->bindParam(":zkratka", htmlspecialchars(strip_tags($this->zkratka)));
        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));
        $stmt->bindParam(":sidlo", htmlspecialchars(strip_tags($this->sidlo)));
        $stmt->bindParam(":cislo_uctu", htmlspecialchars(strip_tags($this->cislo_uctu)));
        
        if ($stmt->execute()){
            return true;
        }

        return false;
    }
}