<?php

include 'connection.php';

if ($conn) {
  $page_name = $_SERVER['REQUEST_URI'];
  $pgs = mysqli_query($conn, "SELECT * FROM `dmotor` WHERE name='$page_name';");
  $array = mysqli_fetch_array($pgs);
  $sub1 = $array['sub1'];
  $sub2 = $array['sub2'];
  $sub3 = $array['sub3'];
  $title = $array['title'];
  
  if ($title !== 'NULL') {

    if ($sub1) {
      $appeal = mysqli_query($conn, "SELECT * FROM `variable1`");
      $data = mysqli_fetch_all($appeal, MYSQLI_ASSOC);
      $id_variable_sub1 = $data[$sub1 - 1]['id'];
      $link_variable_sub1 = $data[$sub1 - 1]['link'];
      $title_variable_sub1 = $data[$sub1 - 1]['title'];
      echo  '<ul class="breadcrumbs__list">
          <li><a href="/">Главная</a></li>
          <li><a href=" ' . $link_variable_sub1 . '"> ' . $title_variable_sub1 . '</a></li>    
  ';
    } else {
      echo '<ul class="breadcrumbs__list">
    <li><a href="/">Главная</a></li>
    <li>' . $title . '</li>
    </ul>
    ';
    return;
    }

    if ($sub2) {
      $appeal = mysqli_query($conn, "SELECT * FROM `variable2`");
      $data = mysqli_fetch_all($appeal, MYSQLI_ASSOC);
      $id_variable_sub2 = $data[$sub2 - 1]['id'];
      $link_variable_sub2 = $data[$sub2 - 1]['link'];
      $title_variable_sub2 = $data[$sub2 - 1]['title'];
      echo '<li><a href=" ' . $link_variable_sub2 . '"> ' . $title_variable_sub2 . '</a></li>
    ';
    }

    if ($sub3) {
      $appeal = mysqli_query($conn, "SELECT * FROM `variable3`");
      $data = mysqli_fetch_all($appeal, MYSQLI_ASSOC);
      $id_variable_sub3 = $data[$sub3 - 1]['id'];
      $link_variable_sub3 = $data[$sub3 - 1]['link'];
      $title_variable_sub3 = $data[$sub3 - 1]['title'];
      echo '<li><a href=" ' . $link_variable_sub3 . '"> ' . $title_variable_sub3 . '</a></li>
          <li>' . $title . '</li>
        </ul>
    ';
    } else {
      echo '<li>' . $title . '</li>
        </ul>
    ';
    }
  }
}
