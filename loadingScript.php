<?php

    include_once "db/db.php";


    if(isset($_POST['username'])){
        $username = $_POST['username'];
        $username = "stilec2";
        $sql_select = "SELECT predmet.nazev as Predmet, predmet.poradi, rozvrh_den.den as Den
        FROM student inner join trida on student.username = '$username' and student.trida_id = trida.id
        inner join rozvrh_tyden on rozvrh_tyden.trida_id = trida.id
        inner join rozvrh_den on rozvrh_den.tyden_id = rozvrh_tyden.id
        inner join predmet on predmet.rozvrh_den_id = rozvrh_den.id
        ";

        //$sql_select = "SELECT trida.nazev,student.jmeno from trida inner join student on student.trida_id = trida.id";
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        
        $response = json_encode($data);
        
        echo $response;
        

    }else echo("Error:Username no set in post.");





    // $username = "stilec2";
    // $sql_select = "SELECT predmet.nazev as Predmet, predmet.poradi
    // FROM student inner join trida on student.username = '$username' and student.trida_id = trida.id
    // inner join rozvrh_tyden on rozvrh_tyden.trida_id = trida.id
    // inner join rozvrh_den on rozvrh_den.tyden_id = rozvrh_tyden.id
    // inner join predmet on predmet.rozvrh_den_id = rozvrh_den.id
    // group by predmet.nazev";

    // //$sql_select = "SELECT trida.nazev,student.jmeno from trida inner join student on student.trida_id = trida.id";
    // $sql_prov = $db->prepare($sql_select);
    // $sql_prov->execute();
    // $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
    // // foreach($data as $value){
    // //     foreach($value as $v){
    // //         print($v." ");
    // //     }
    // // }
    // var_dump($data);
    
    

?>