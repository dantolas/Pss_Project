<?php

    define('DB_NAME', 'test2');
    define('DB_USER', 'admin');
    define('DB_PASSWORD', 'admin');
    define('DB_HOST', '127.0.0.1');

    global $db;
    $db = new PDO(
         "mysql:host=" .DB_HOST. ";dbname=" .DB_NAME,DB_USER,DB_PASSWORD,
        array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        )
     );
?>