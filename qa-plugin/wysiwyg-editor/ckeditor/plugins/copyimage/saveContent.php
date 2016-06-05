<?php
$data =  $_POST['data'];
$post_id =  $_POST['post_id'];
$db_name = 'question2answer';
 
$db = mysql_connect('localhost:3306', 'user', 'user');

mysql_select_db($db_name,$db);
 
$sql = "UPDATE qa_posts set content = '{$data}' WHERE postid={$post_id}";
$req = mysql_query($sql);
$data = mysql_fetch_assoc($req);
 
 
?>