<?php

include 'connection.php';

if ($conn) {

  $page_name = $_SERVER['REQUEST_URI'];
  $pgs = mysqli_query($conn, "SELECT * FROM dmotor WHERE name='$page_name' ;");
  $data = mysqli_fetch_array($pgs);

  //проверка ссылки с помощью регулярного выражения
  $pattern = '#[a-zA-Z1-9-].htm#';
  if ($data == '' && preg_match($pattern, $page_name) == 1) {
    $query = "INSERT INTO dmotor (`id`, `name`, `sub1`, `sub2`,`sub3`,`title`,`checked`)
  VALUES ('0','$page_name','0','0','0','NULL','0')";
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
  }
}
