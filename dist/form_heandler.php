<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Купить сервопривод | Продажа сервоприводов и серводвигателей</title>

  <div class="wrapper">

    <?php include "header.htm"; ?>
    <!-- <main class="main">
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
              Ожидайте звонка/письма <br> от нашего специалиста в ближайшее время
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
    </main> -->
    <?php

    if (isset($_POST['email'])) {

      $name = $_POST['name'];
      $email = $_POST['email'];
      $comment = $_POST['comment'];
      $capcha = $_POST['company'];
      $ip = $_SERVER['REMOTE_ADDR'];


      if ($capcha !== '') {
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
      $page_address = $host_name . $pageurl;

      $emailTo = 'animal_spirit@mail.ru'; //email получения формы
      $message .= "Заявка отправлена со страницы:  <a href='http://" . $page_address . "'>" . $page_address . "</a> <br>
      Имя:  $name <br>
      IP: $ip <br>
      Cообщение:  $comment"; // формируем что отправляется на почту
      $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . "Content-Type: text/html; charset=\"utf-8\"" . "\r\n"; // формируем почту отправителя
      $subject = 'Заявка с сайта';

      if (mail($emailTo, $subject, $message, $headers)) {
        print_r(`<main class="main">
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
              Ожидайте звонка/письма <br> от нашего специалиста в ближайшее время
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
    </main>`);
      } else {
        $result = 2;//сообщение не отправлено
      }
    }
    ?>
    <?php include "footer.htm"; ?> -->
  </div>