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

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM klan WHERE tag=:tag");
        
        $stmt->bindParam(":tag", htmlspecialchars(strip_tags($this->tag)));

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

        if ($stmt->execute()){
            return true;
        }

        return false;
    }
}