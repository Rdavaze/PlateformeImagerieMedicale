<?php
$postid = $_POST['postid'];
$color = $_POST['color'];
$x1 =  $_POST['x1'];
$y1 =  $_POST['y1'];
$x2 =  $_POST['x2'];
$y2 =  $_POST['y2'];
$db_name = 'question2answer';
 
$db = mysql_connect('localhost:3306', 'user', 'user');

mysql_select_db($db_name,$db);
 
$sql = "INSERT INTO qa_annotations VALUES ('NULL','{$postid}','{$x1}','{$x2}','{$y1}','{$y2}','{$color}','NULL','1','0')";
$req = mysql_query($sql);
$data = mysql_fetch_assoc($req);
 
 
?>