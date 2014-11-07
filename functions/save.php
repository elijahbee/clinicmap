<?php
include_once 'connect.php';

// Gets data from URL parameters
$name = mysql_real_escape_string(trim($_GET['name']));
$address =  mysql_real_escape_string(trim($_GET['address']));
$lat =  mysql_real_escape_string(trim($_GET['lat']));
$lng =  mysql_real_escape_string(trim($_GET['lng']));
$type =  mysql_real_escape_string(trim($_GET['type']));
$token =  mysql_real_escape_string(trim($_GET['token']));

// Check if token already exists
$count = "Select * from markers where token = '$token'";
$i = mysql_query($query);
$count = mysql_num_rows($i);

if($count < 1){
// Insert new record with token information
$query = sprintf("INSERT INTO markers " .
         " (name, address, lat, lng, token, type ) " .
         " VALUES ('%s', '%s', '%s', '%s', '%s', '%s');",
		 $name,$address,$lat,$lng,$token,$type);
		
		$result = mysql_query($query);
		
		if (!$result) {
			echo 0;
		}else{
			echo 1;
		}
}else{
	// Fetch additional information, doctors registered here etc
	echo '';
}
?>