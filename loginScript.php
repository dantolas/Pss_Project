<?php

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


    
    
  
    

   

    function printUserByMail() {

    }

    function getUserByName($username,$db){

        $sql_select = "SELECT jmeno,prijmeni,email,password,role FROM ucitel WHERE username = '$username'";       
            $sql_prov = $db->prepare($sql_select);
            $sql_prov->execute();
            $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        if($data != null) return $data;

        $sql_select = "SELECT jmeno,prijmeni,email,password FROM student WHERE username = '$username'";       
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        if($data == null) return $data;

        $data[0]['role'] = 'student';
        return $data;

    }

    //Function to fetch user info with email
    function getUserByMail($email,$db){

        $sql_select = "SELECT jmeno,prijmeni,email,password,role FROM ucitel WHERE email = '$email'";       
            $sql_prov = $db->prepare($sql_select);
            $sql_prov->execute();
            $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

        if($data != null)return $data;

        $sql_select = "SELECT jmeno,prijmeni,password,email FROM student WHERE email = '$email'";       
        $sql_prov = $db->prepare($sql_select);
        $sql_prov->execute();
        $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
        if($data == null) return $data;
        $data[0]['role'] = 'student';
        return $data;
    }
    //Regex check proti SQLinjekcim - true if validation failed
    function usernameValidation($username){
        return preg_match('/[\'^£$%&*()}{#~?><>,|=+¬-]/', $username);
    }

    function echoDbData(){
        if($data == null) {
            echo "null";
            return;
        }
        
        foreach($data[0] as $value){
            echo $value."  ";
        }
    }

    function printDBData($data){
        
        if($data == null) {
            print("null");
            return;
        }
        
        foreach($data[0] as $value){
            print($value."  ");
        }
    }
    //Gets usere information from database
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

    //Validate login
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

?>