<?php
class Turnaj{

    private $conn;

    public $id;
    public $nazev;
    public $datum_konani;
    public $hlavni_cena;
    public $nazev_hry;
    public $vitez;
    public $id_organizator_turnaje;

    public function __construct($db){
        $this->conn = $db;
    }


    function create(){
        $stmt = $this->conn->prepare("INSERT INTO turnaj SET nazev=:nazev, datum_konani=:datum_konani, hlavni_cena=:hlavni_cena, nazev_hry=:nazev_hry, vitez=:vitez, id_organizator_turnaje=:id_organizator_turnaje");

        $stmt->bindParam(":datum_konani", htmlspecialchars(strip_tags($this->datum_konani)));
        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));
        $stmt->bindParam(":hlavni_cena", htmlspecialchars(strip_tags($this->hlavni_cena)));
        $stmt->bindParam(":nazev_hry", htmlspecialchars(strip_tags($this->nazev_hry)));
        $stmt->bindParam(":vitez", htmlspecialchars(strip_tags($this->vitez)));
        $stmt->bindParam(":id_organizator_turnaje", htmlspecialchars(strip_tags($this->id_organizator_turnaje)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    function update(){
        $stmt = $this->conn->prepare("SELECT * FROM turnaj WHERE id=:id");
        
        $stmt->bindParam(":id", htmlspecialchars(strip_tags($this->id)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return false;
        }

        $stmt = $this->conn->prepare("UPDATE turnaj SET nazev=:nazev, datum_konani=:datum_konani, hlavni_cena=:hlavni_cena, nazev_hry=:nazev_hry, vitez=:vitez, id_organizator_turnaje=:id_organizator_turnaje WHERE id=:id");

        $stmt->bindParam(":id", htmlspecialchars(strip_tags($this->id)));

        $stmt->bindParam(":datum_konani", htmlspecialchars(strip_tags($this->datum_konani)));
        $stmt->bindParam(":nazev", htmlspecialchars(strip_tags($this->nazev)));
        $stmt->bindParam(":hlavni_cena", htmlspecialchars(strip_tags($this->hlavni_cena)));
        $stmt->bindParam(":nazev_hry", htmlspecialchars(strip_tags($this->nazev_hry)));
        $stmt->bindParam(":vitez", htmlspecialchars(strip_tags($this->vitez)));
        $stmt->bindParam(":id_organizator_turnaje", htmlspecialchars(strip_tags($this->id_organizator_turnaje)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    function delete(){
        $stmt = $this->conn->prepare("DELETE FROM turnaj WHERE id=:id");
        
        $stmt->bindParam(":id", htmlspecialchars(strip_tags($this->id)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    function read(){
        $stmt = $this->conn->prepare("SELECT * FROM turnaj");

        $stmt->execute();

        return $stmt;
    }
}
?>