<?php
class OrganizatorTurnaje{

    private $conn;

    public $prezdivka;
    public $jmeno;
    public $tel_cislo;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
        $stmt = $this->conn->prepare("SELECT * FROM organizator_turnaje");

        $stmt->execute();
    
        return $stmt;
    }


    function create(){

        $stmt = $this->conn->prepare("INSERT INTO organizator_turnaje SET jmeno=:jmeno, tel_cislo=:tel_cislo");

        $stmt->bindParam(":jmeno", htmlspecialchars(strip_tags($this->jmeno)));
        $stmt->bindParam(":tel_cislo", htmlspecialchars(strip_tags($this->tel_cislo)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }

    function update(){
        $stmt = $this->conn->prepare("SELECT * FROM uzivatel WHERE prezdivka=:prezdivka");
        
        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));

        $stmt->execute();

        if ($stmt->rowCount() == 0){
            return true;
        }

        $stmt = $this->conn->prepare("UPDATE organizator_turnaje SET jmeno=:jmeno, tel_cislo=:tel_cislo WHERE prezdivka=:prezdivka");

        $stmt->bindParam(":prezdivka", htmlspecialchars(strip_tags($this->prezdivka)));
        $stmt->bindParam(":jmeno", htmlspecialchars(strip_tags($this->jmeno)));
        $stmt->bindParam(":tel_cislo", htmlspecialchars(strip_tags($this->tel_cislo)));

        if ($stmt->execute()){
            return true;
        }

        return false;
    }


}
?>