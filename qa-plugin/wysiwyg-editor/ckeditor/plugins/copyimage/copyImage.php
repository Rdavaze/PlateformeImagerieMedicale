<?php
$title =  $_GET['title'];
$db_name = 'question2answer';
 
$db = mysql_connect('localhost:3306', 'user', 'user');

mysql_select_db($db_name,$db);
 
$sql = "SELECT content FROM qa_posts WHERE type = 'Q' AND title = '{$title}' ";
$req = mysql_query($sql);
$data = mysql_fetch_assoc($req);
 
echo $data['content'];
 
?>