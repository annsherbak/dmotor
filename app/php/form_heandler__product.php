<?php

if(isset($_POST['email'])){

$email = $_POST['email'];
$capcha = $_POST['company'];
$ip = $_SERVER['REMOTE_ADDR'];


if($capcha !== '') {
   exit('');
}

//декодируем элементы формы

$email = htmlspecialchars($email);//преобразовываем символы
$email = urldecode($email); //декодируем url, если пользователь пытался его добавить
$email = trim($email);//удаляем пробелы с начала и конца строки

$ip = htmlspecialchars($ip);
$ip = urldecode($ip);
$ip = trim($ip);

$host_name = $_SERVER['SERVER_NAME'];
$page_address = $host_name.$pageurl;

$emailTo = 'animal_spirit@mail.ru'; //email получения формы
$message .= "Заявка отправлена со страницы:  <a href='http://".$page_address."'>".$page_address."</a> <br>
      Почта:  $email <br>
      IP: $ip <br>
      Cообщение:  $comment"; // формируем что отправляется на почту
$headers = 'From: '.$email. "\r\n" .
          'Reply-To: '.$email. "\r\n" . 'MIME-Version: 1.0' . "\r\n" . "Content-Type: text/html; charset=\"utf-8\"". "\r\n"; // формируем почту отправителя
$subject = 'Заявка с сайта';

if (mail($emailTo, $subject, $message, $headers)) {
        // $result = 1; //success
        echo "<p class=\"product-card__form-done\">Ваша заявка успешно доставлена! <br> Наши специалисты свяжутся с вами в ближайшее время</p>";

      } else {
        echo 'Ваша заявка не отправлена'; //сообщение не отправлено
      }
  }
?>
