<?php
class Tym{

    private $conn;

    public $nazev_tymu;
    public $pocet_hracu;
    public $nazev_hry;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
           $stmt = $this->conn->prepare("SELECT * FROM tym");

           $stmt->execute();

           return $stmt;
    }

    function readOne(){
        $stmt = $this->conn->prepare("SELECT * FROM tym WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));

        $stmt->execute();
     
        return $stmt;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM tym WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));

        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("SELECT * FROM hra WHERE nazev=:nazev");
        
        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev_hry)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }

        $stmt = $this->conn->prepare("INSERT INTO tym SET nazev_tymu=:nazev_tymu, pocet_hracu=:pocet_hracu, nazev_hry=:nazev_hry");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":pocet_hracu", htmlspecialchars(strip_tags($this->pocet_hracu)));
        $stmt->bindParam(":nazev_hry", htmlspecialchars(strip_tags($this->nazev_hry)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    function delete(){
        $stmt = $this->conn->prepare("DELETE FROM tym WHERE nazev_tymu=:nazev_tymu");

        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    function update(){
        $stmt = $this->conn->prepare("SELECT * FROM tym WHERE nazev_tymu=:nazev_tymu");
        
        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }

        $stmt = $this->conn->prepare("UPDATE tym SET pocet_hracu=:pocet_hracu, nazev_hry=:nazev_hry WHERE nazev_tymu=:nazev_tymu");
        
        $stmt->bindParam(":nazev_tymu", htmlspecialchars(strip_tags($this->nazev_tymu)));
        $stmt->bindParam(":pocet_hracu", htmlspecialchars(strip_tags($this->pocet_hracu)));
        $stmt->bindParam(":nazev_hry", htmlspecialchars(strip_tags($this->nazev_hry)));


        if ($stmt->execute()){
            return true;
        }

        return false;
    }
}