<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Купить сервопривод | Продажа сервоприводов и серводвигателей</title>

  <div class="wrapper">

    <?php include "header.htm"; ?>

    <?php
require './phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = "mail.gearmotor.ru";
$mail->Port = 5555;
$mail->SMTPAuth = true;
$mail->Username = "sale@dmotor.ru";
$mail->Password = "EK1UZDVRGfjNPMba";
$mail->CharSet = 'UTF-8';
$mail->setFrom('sale@dmotor.ru', 'Dmotor Contact Form');
//Set who the message is to be sent to
$mail->addAddress('sale@electroprivod.ru', 'Dmotor Sales Managers');
//Set the subject line
$mail->Subject = 'Заявка с сайта dmotor.ru';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->isHTML(false);
    if (isset($_POST['email'])) {
      $email = $_POST['email'];
      $capcha = $_POST['company'];
      $ip = $_SERVER['REMOTE_ADDR'];




      //декодируем элементы формы

      $email = htmlspecialchars($email); //преобразовываем символы
      $email = urldecode($email); //декодируем url, если пользователь пытался его добавить
      $email = trim($email); //удаляем пробелы с начала и конца строки

      $ip = htmlspecialchars($ip);
      $ip = urldecode($ip);
      $ip = trim($ip);

      $host_name = $_SERVER['SERVER_NAME'];
      $page_address = $host_name . $pageurl;

      $emailTo = 'animal_spirit@mail.ru'; //email получения формы
$mail->Body = <<<EOT
Заявка отправлена со страницы:  {$page_address}
Почта:  {$email}
IP: {$ip}
Cообщение:  $comment";
EOT;
      if ($mail->send()) {    ?>
        <script>
          dataLayer.push({'event': 'form_email_send'});
        </script>
      <main class="main">
      <div class="container">
        <section class="form-heandler">
          <picture class="form-heandler__pic">
            <source media="(max-width: 767px)" srcset="images/form__heandler-mobil.png">
            <source media="(max-width: 1170px)" srcset="images/form__heandler-tablet.png">
            <img src="images/form__heandler.png" alt="">
          </picture>
          <div class="form-heandler__desc">
            <h1 class="form-heandler__desc-title">
              Спасибо,<br> мы получили ваш вопрос
            </h1>
            <p class="form-heandler__desc-text">
              Ожидайте письма <br> от нашего специалиста в ближайшее время
            </p>
            <div class="form-heandler__desc-buttons">
              <a class="form-heandler__desc-buttons--main" href="/">На главную</a>
              <a class="form-heandler__desc-buttons--product" href="/product.htm">К продукции</a>
            </div>
            <p class="form-heandler__desc-comment">
              Срочный вопрос по&nbsp;наличию товара, стоимости, технической документации можно задать нам по&nbsp;телефону <a href="tel:+78127030981">+7 (812) 703-09-81</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  <?php  } else {
        $result = 2;
  ?>
  <main class="main">
<div class="container">
  <div class="form-heandler__desc">
    <section class="form-heandler">
          <h1 class="form-heandler__desc-title">Ваша заявка не отправлена</h1>
          </section>
            </div>
      </div>
    </main>
    <?php
  }
    }
    ?>
    <?php include "footer.htm"; ?> -->
  </div>
