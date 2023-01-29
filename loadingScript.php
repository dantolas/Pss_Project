<?php

    include_once "db/db.php";


    if(isset($_POST['username']) && isset($_POST['role'])){
        

        
        $role = $_POST['role'];
        $username = $_POST['username'];
        
        if($role == 'student'){
            $response = fetchStudentRozvrh($username,$db);
        
            echo $response;
        return;
        }

        if($role == 'admin' || $role == 'ucitel'){
            
            $response = fetchUcitelRozvrh($username, $db);
            var_dump($response);
            echo $response;
        return;
        }
        
        
        
        
        

    }else echo("{ Error : Usernamenotsetinpost}");


    #region <>
    function fetchStudentRozvrh($username,$db){
        $sql_select = "SELECT predmet.zkratka as Predmet, predmet.poradi, rozvrh_den.den as Den, ucitel.zkratka as ucitel
        FROM student inner join trida on student.username = '$username' and student.trida_id = trida.id
        inner join rozvrh_tyden on rozvrh_tyden.trida_id = trida.id
        inner join rozvrh_den on rozvrh_den.tyden_id = rozvrh_tyden.id
        inner join predmet on predmet.rozvrh_den_id = rozvrh_den.id
        inner join ucitel on predmet.ucitel_id = ucitel.id
        ";

        //$sql_select = "SELECT trida.nazev,student.jmeno from trida inner join student on student.trida_id = trida.id";
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($data);
    }
    #endregion
    

    function fetchUcitelRozvrh($username,$db){
        $sql_select = "SELECT predmet.zkratka as Predmet, predmet.poradi, rozvrh_den.den as Den
        FROM ucitel inner join rozvrh_tyden on ucitel.username = '$username' and ucitel.id= rozvrh_tyden.ucitel_id
        inner join rozvrh_den on rozvrh_den.tyden_id = rozvrh_tyden.id
        inner join predmet on predmet.rozvrh_den_id = rozvrh_den.id
        ";

        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        var_dump($data);
        return json_encode($data);
    }
    
    

?>