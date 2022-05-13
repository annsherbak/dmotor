<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Купить сервопривод | Продажа сервоприводов и серводвигателей</title>

  <div class="wrapper">

    <?php include "header.htm"; ?>
    <main class="main">
      <div class="container"></div>
    </main>
<?php

if(isset($_POST['email'])){

$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['comment'];
$capcha = $_POST['company'];
$ip = $_SERVER['REMOTE_ADDR'];


if($capcha !== '') {
   exit('');
}

//декодируем элементы формы
$name = htmlspecialchars($name); //преобразовываем символы
$name = urldecode($name); //декодируем url, если пользователь пытался его добавить
$name = trim($name); //удаляем пробелы с начала и конца строки

$email = htmlspecialchars($email);
$email = urldecode($email);
$email = trim($email);


$comment = htmlspecialchars($comment);
$comment = urldecode($comment);
$comment = trim($comment);

$ip = htmlspecialchars($ip);
$ip = urldecode($ip);
$ip = trim($ip);

$host_name = $_SERVER['SERVER_NAME'];
$page_address = $host_name.$pageurl;

$emailTo = 'animal_spirit@mail.ru'; //email получения формы
$message .= "Заявка отправлена со страницы:  <a href='http://".$page_address."'>".$page_address."</a> <br>
      Имя:  $name <br>
      IP: $ip <br>
      Cообщение:  $comment"; // формируем что отправляется на почту
$headers = 'From: '.$email. "\r\n" .
          'Reply-To: '.$email. "\r\n" . 'MIME-Version: 1.0' . "\r\n" . "Content-Type: text/html; charset=\"utf-8\"". "\r\n"; // формируем почту отправителя
$subject = 'Заявка с сайта';

if (mail($emailTo, $subject, $message, $headers)) {
        // $result = 1; //success
        echo "<p class=\"question__form-done\">Ваша заявка успешно доставлена! <br> Наши специалисты свяжутся с вами в ближайшее время</p>";

      } else {
        echo 'Ваша заявка не отправлена'; //сообщение не отправлено
      }
  }
?>
<?php include "footer.htm"; ?>
</div>