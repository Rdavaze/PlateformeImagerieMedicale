<?php
$db_name = 'question2answer';
 
$db = mysql_connect('localhost:3306', 'user', 'user');

mysql_select_db($db_name,$db);
 
$sql = "SELECT MAX(`postid`) AS max_postid FROM `qa_posts`";
$req = mysql_query($sql);
$data = mysql_fetch_assoc($req);


echo json_encode($data);

 
?>