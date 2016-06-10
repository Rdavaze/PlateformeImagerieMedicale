<?php
$postid = $_POST['postid'];

$db_name = 'question2answer';
 
$db = mysql_connect('localhost:3306', 'user', 'user');

mysql_select_db($db_name,$db);
 
$sql = "DELETE FROM qa_annotations WHERE isLasso=1 ORDER BY id DESC LIMIT 1";
$req = mysql_query($sql);
$data = mysql_fetch_assoc($req);
 
 
?>