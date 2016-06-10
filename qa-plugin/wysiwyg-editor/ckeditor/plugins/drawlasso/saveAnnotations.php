<?php
$coordinates = $_POST['coordinates'];
$postid = $_POST['postid'];
$color = $_POST['color'];

$db_name = 'question2answer';
 
$db = mysql_connect('localhost:3306', 'user', 'user');

mysql_select_db($db_name,$db);
 
$sql = "INSERT INTO qa_annotations VALUES ('NULL','{$postid}','0','0','0','0','{$color}','{$coordinates}','0','1')";
$req = mysql_query($sql);
$data = mysql_fetch_assoc($req);
 
 
?>