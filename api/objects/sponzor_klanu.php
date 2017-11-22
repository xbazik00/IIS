<?php
class Sponzor_klanu{

    private $conn;
    public $tag_klanu;
    public $zkratka_sponzora;

    public function __construct($db){
        $this->conn = $db;
    }

    function getSponzorAcronym(){
        $stmt = $this->conn->prepare("SELECT * FROM financovani_klanu WHERE tag_klanu=:tag_klanu");
        
        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
            
        $stmt->execute();
    
        return $stmt;
    }

    function create(){
        $stmt = $this->conn->prepare("SELECT * FROM financovani_klanu WHERE zkratka_sponzora=:zkratka_sponzora AND tag_klanu=:tag_klanu");
        
        $stmt->bindParam(":zkratka_sponzora", htmlspecialchars(strip_tags($this->zkratka_sponzora)));
        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
        
        $stmt->execute();

        if ($stmt->rowCount() > 0){
            return false;
        }

        $stmt = $this->conn->prepare("INSERT INTO financovani_klanu SET zkratka_sponzora=:zkratka_sponzora, tag_klanu=:tag_klanu");

        $stmt->bindParam(":zkratka_sponzora", htmlspecialchars(strip_tags($this->zkratka_sponzora)));
        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    function delete(){
        $stmt = $this->conn->prepare("DELETE FROM financovani_klanu WHERE zkratka_sponzora=:zkratka_sponzora AND tag_klanu=:tag_klanu");

        $stmt->bindParam(":zkratka_sponzora", htmlspecialchars(strip_tags($this->zkratka_sponzora)));
        $stmt->bindParam(":tag_klanu", htmlspecialchars(strip_tags($this->tag_klanu)));
    
        if ($stmt->execute()){
            return true;
        }

        return false;
        
    }

}
?>