<?php 
/*
 * File: doCurl.php
 * Project: mt-tracker
 * File Created: Tuesday, 11th May 2021 8:16:10 pm
 * Author: Mark Kennard (mark@snowmeister.co.uk)
 * -----
 * Last Modified: Tuesday, 11th May 2021 8:16:10 pm
 * Modified By: Mark Kennard (mark@snowmeister.co.uk>)
 * -----
 * Copyright 2018 - 2021 Mark Kennard AKA Snowmeister
 */


function doCurl($url)
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
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

?>