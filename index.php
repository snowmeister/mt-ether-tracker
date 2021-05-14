<?php 
/*
 * File: index.php
 * Project: mt-tracker
 * File Created: Tuesday, 11th May 2021 7:45:24 pm
 * Author: Mark Kennard (mark@snowmeister.co.uk)
 * -----
 * Last Modified: Tuesday, 11th May 2021 7:45:25 pm
 * Modified By: Mark Kennard (mark@snowmeister.co.uk>)
 * -----
 * Copyright 2018 - 2021 Mark Kennard AKA Snowmeister
 */


function getEther()
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'api.coincap.io/v2/assets/ethereum',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    return $response;
}




$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/' :
        http_response_code(200);
        require __DIR__ . '/views/index.php';
        break;
    case '' :
        http_response_code(200);
        require __DIR__ . '/views/index.php';
        break;
    case '/rate' :
        http_response_code(200);
        require __DIR__ . '/views/rate.php';
        break;
    default:
        http_response_code(404);
        require __DIR__ . '/views/404.php';
        break;
}





 ?>
