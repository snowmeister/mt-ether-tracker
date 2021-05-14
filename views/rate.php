<?php

require 'lib/doCurl.php';


$myObj = new \stdClass();


$etherURL = "http://api.coincap.io/v2/assets/ethereum";
 
$ether = doCurl($etherURL);


$rateURL = "http://api.coincap.io/v2/rates/british-pound-sterling";
$rate  = doCurl($rateURL);



 $myObj->route = "rate";
 $myObj->date = time();
 $myObj->ether = json_decode($ether);
 $myObj->rate = json_decode($rate);
 
 $myJSON = json_encode($myObj);

 echo $myJSON;

?>