<?php if(isset($_GET['id'])){
$id = $_GET['id'];
$sql = "SELECT * FROM markers WHERE token LIKE '$id' LIMIT 1;";
$qry = mysql_query($sql) or die(mysql_error());
while ($row = mysql_fetch_assoc($qry)) {
	echo json_encode($row);
 } } ?>