<?php

    include_once "db/db.php";

    handlePost($_POST,$db);

    #region <Post handler function>
    function handlePost($POST,$db){
        if (!isset($POST['header'])){
            echo "Error : Header of request not set."; return;
        }
        
    
        if($POST['header'] == 'rozvrh'){
            fetchRozvrhByUsername($db); return;
        }
    
        if($POST['header'] == 'trida'){
            fetchTrida($_POST['username'],$db); return;
        }

        if($POST['header'] == 'rozvrh_trida'){
            fetchClassRozvrh($_POST['trida'],$db); return;
        }

        if($POST['header'] == 'user'){
            getUserById($_POST['id'],$_POST['role'],$db);return;
        }

        if($POST['header'] == 'classList'){
            fetchClassList($db);return;
        }

        if($POST['header'] == 'teacherList'){
            fetchTeacherList($db);return;
        }

        echo "{Error:Unknown Header}";
    }
    #endregion

    #region <Fetching rozvrh by username>
    function fetchRozvrhByUsername($db){
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
                
                echo $response;
            return;
            }
    
        }else echo(" Error : Username or role not set in post request");
    }
    #endregion
    
    #region <Fetching classList>
    function fetchClassList($db){

        $sql_select = "SELECT trida.nazev from trida";

        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        
        
        echo json_encode($data);
        //echo $data;
        //echo $data[0]['nazev'];
    }
    #endregion

    #region <Fetching classList>
    function fetchTeacherList($db){

            $sql_select = "SELECT ucitel.jmeno,ucitel.prijmeni from ucitel";
        
            $sql_prov = $db->prepare($sql_select);
            $sql_prov->execute();
            $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($data);
            //echo $data;
            //echo $data[0]['jmeno'].' '.$data[0]['prijmeni'];
        }
    #endregion

    #region <Fetching classname by username>
    function fetchTrida($username,$db){

        $sql_select = "SELECT trida.nazev from trida inner join student on trida.id = student.trida_id and student.username = '$username'
        ";

        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        
        echo $data[0]['nazev'];
    }
    #endregion
    
    #region <Fetching rozvrh for student - used in fetch by username>
    function fetchStudentRozvrh($username,$db){
        $sql_select = "SELECT predmet.zkratka as Predmet, predmet.poradi, rozvrh_den.den as Den, ucitel.zkratka as ucitel, predmet.ucebna as ucebna, predmet.nahradni as nahradni
        FROM student inner join trida on student.username = '$username' and student.trida_id = trida.id
        inner join rozvrh_tyden on rozvrh_tyden.trida_id = trida.id
        inner join rozvrh_den on rozvrh_den.tyden_id = rozvrh_tyden.id
        inner join predmet on predmet.rozvrh_den_id = rozvrh_den.id
        inner join ucitel on predmet.ucitel_id = ucitel.id
        ";

        
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        
        return json_encode($data);
    }
    #endregion
    
    #region <Fetching rozvrh by classname>
    function fetchClassRozvrh($class,$db){
        $sql_select = "SELECT predmet.zkratka as Predmet, predmet.poradi, rozvrh_den.den as Den, ucitel.zkratka as ucitel, predmet.ucebna as ucebna, predmet.nahradni as nahradni
        from trida
        inner join rozvrh_tyden on trida.nazev = '$class' and rozvrh_tyden.trida_id = trida.id
        inner join rozvrh_den on rozvrh_den.tyden_id = rozvrh_tyden.id
        inner join predmet on predmet.rozvrh_den_id = rozvrh_den.id
        inner join ucitel on predmet.ucitel_id = ucitel.id
        ";

        
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        
        echo json_encode($data);
    }
    #endregion

    #region <fetching rozvrh for teacher - used in fetch by username>
    function fetchUcitelRozvrh($username,$db){
        
        

        $sql_select = "SELECT ucitel.jmeno, rozvrh_tyden.id as tyden, rozvrh_den.den as Den, predmet.zkratka as Predmet, predmet.ucebna as ucebna,predmet.nahradni as nahradni, predmet.poradi
        from ucitel inner join rozvrh_tyden on ucitel.username = '$username' and ucitel.id = rozvrh_tyden.ucitel_id
        inner join rozvrh_den on rozvrh_den.tyden_id = rozvrh_tyden.id
        inner join predmet on predmet.rozvrh_den_id = rozvrh_den.id
        
        ";


        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        
        return json_encode($data);
    }
    #endregion
    
    #region <Get userdata by id from db>
    function getUserById($id,$role,$db){
        $data = null;
        if($role != 'student'){
            $sql_select = "SELECT jmeno,prijmeni,role,username FROM ucitel WHERE id = $id";       
            $sql_prov = $db->prepare($sql_select);
            $sql_prov->execute();
            $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        }

        if($data != null){
            $json = json_encode($data[0]);
            echo $json;
            return;
        }

        $sql_select = "SELECT jmeno,prijmeni,username FROM student WHERE id = $id";       
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        if($data != null){
            $data[0]['role'] = 'student';
            $json = json_encode($data[0]);
            echo $json;
            return;
        } 
        return;
    }
    #endregion

?>