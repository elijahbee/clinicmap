<?php
include 'connect.php';

// Gets data from URL parameters
$name = $_GET['name'];
$address =  mysql_real_escape_string($_GET['address']);
$lat =  mysql_real_escape_string($_GET['lat']);
$lng =  mysql_real_escape_string($_GET['lng']);
$type =  mysql_real_escape_string($_GET['type']);
$token =  mysql_real_escape_string($_GET['token']);

// Check if token already exists
$count = "Select count(*) as count from markers where token = '$token'";
$i = mysql_query($query);

echo $i;
die();

if($i == 0){
// Insert new row with user data
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
		
}
?>