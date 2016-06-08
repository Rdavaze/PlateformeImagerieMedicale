<?php
$db_name = 'question2answer';
 
$db = mysql_connect('localhost:3306', 'user', 'user');

mysql_select_db($db_name,$db);
 
$sql = "SELECT * FROM qa_annotations";
$req = mysql_query($sql);
$data = [];
while ($row = mysql_fetch_assoc($req)) {
	array_push($data,$row);
}

echo json_encode($data);

 
?>