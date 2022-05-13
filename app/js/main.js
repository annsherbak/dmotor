$(document).ready(function () {

 // кнопка "наверх на мобильной версии"

  $('.footer__buttonUp').click(function () {
    $('html, body').animate({ scrollTop: 0 });
    return false;
  });

});
  
 

