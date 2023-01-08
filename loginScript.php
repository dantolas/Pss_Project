<?php

    include_once "db/db.php";

    getUserFromDatabase($_POST,$db);

    $username = $_POST['username'];
    print(appendString("Username inputed: ",$username));
    print(" Pregmatch result:");
    print(!preg_match('/[\'^£$%&*()}{@#~?><>,|=+¬-]/', $username));
    $pass = $_POST['password'];
    //Regex check proti SQLinjekcim
    if(!preg_match('/[\'^£$%&*()}{@#~?><>,|=+¬-]/', $username)) {
        //passed
        
        print(" passed\n");
    }else{
        //notPassed
        print(" notPassed");
    }
    
    // $sql_select = "SELECT name,email FROM users WHERE email = 'xd'";       
    // $sql_prov = $db->prepare($sql_select);
    // $sql_prov->execute();
    // $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);
    
    //header("location: index.html");
    
    foreach($data as $key){
        foreach($key as $value){
            
            
            print(" ");
            print($value);
            print(" ");
            
        }
    }

    function appendString($str0,$str1){
        $str0 .= $str1;
        return $str0;
    }

    function printUserByMail() {

    }

    function getUserFromDatabase($post,$db){
        $data;
        $username = $post['username'];
        //check if user inputed username or email
        if(filter_var($username, FILTER_VALIDATE_EMAIL)){
            $sql_select = "SELECT jmeno,prijmeni,email FROM ucitel WHERE email = '$username'";       
            $sql_prov = $db->prepare($sql_select);
            $sql_prov->execute();
            $data = $sql_prov->fetchAll(PDO::FETCH_ASSOC);

            if($data = null)
        }

        foreach($data as $key){
            foreach($key as $value){
                
                
                print(" ");
                print($value);
                print(" ");
                
            }
        }
        
        $pass = $_POST['password'];
    
    }

?>