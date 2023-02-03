<?php
    #region <Main code>
    include_once "db/db.php";

    
    
    if(isset($_POST['password'])  && isset($_POST['name'])){
        $username = $_POST['name'];
        $pass = $_POST["password"];
        //echo "Username:".$username." Pass:".$pass;

        $data = getUserFromDatabase($username,$db) ? : null;

        if(validateLogin($data,$_POST['password'])){
            $data[0]['login'] = 'valid';
            unset($data[0]['password']);
            $json = json_encode($data[0]);
            
            echo $json;
            
        }else{
            $data[0]['login'] ='invalid';
            unset($data[0]['password']);
            $json = json_encode($data[0]);
            echo $json;
        }

    }else echo("Error");
    #endregion

    #region <Fetch userdata by username - child to getUserFromDatabase()>
    function getUserByName($username,$db){

        $sql_select = "SELECT jmeno,prijmeni,email,password,role,username FROM ucitel WHERE username = '$username'";       
            $sql_prov = $db->prepare($sql_select);
            $sql_prov->execute();
            $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        if($data != null) return $data;

        $sql_select = "SELECT jmeno,prijmeni,email,password,username FROM student WHERE username = '$username'";       
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        if($data == null) return $data;

        $data[0]['role'] = 'student';
        return $data;

    }
    #endregion
    
    #region <Fetch userdata by email - child to getUserFromDatabase()>
    function getUserByMail($email,$db){

        $sql_select = "SELECT jmeno,prijmeni,email,password,role,username FROM ucitel WHERE email = '$email'";       
            $sql_prov = $db->prepare($sql_select);
            $sql_prov->execute();
            $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        if($data != null)return $data;

        $sql_select = "SELECT jmeno,prijmeni,password,email,username FROM student WHERE email = '$email'";       
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        if($data == null) return $data;
        $data[0]['role'] = 'student';
        return $data;
    }
    #endregion
        
    #region <Fetch userdata from database>
    function getUserFromDatabase($username,$db){
        
        if(usernameValidation($username)) return null;
        
        
        //check if user inputed username or email

        //Do for email
        if(filter_var($username, FILTER_VALIDATE_EMAIL)){
            $data = getUserByMail($username,$db);
           
            return $data;
        }
        //Do for username
        $data = getUserByName($username,$db);
        
        return $data;
    
    }
    #endregion
    
    #region <SQLInjection check>
    function usernameValidation($username){
        return preg_match('/[\'^£$%&*()}{#~?><>,|=+¬-]/', $username);
    }
    #endregion

    #region <Login validation>
    function validateLogin($data,$password){
        if($data == null) return false;
        if(count($data) > 1){
            echo("Database error:Two users with the same username");
            return false;
        }
        
       
        if($data[0]['password'] == $password){
            return true;
        }
        return false;
    }
    #endregion
?>