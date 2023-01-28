$(document).ready(function () {

  // кнопка "наверх на мобильной версии"
  $('.footer__buttonUp').click(function () {
    $('html, body').animate({ scrollTop: 0 });
    return false;
  });
  // кнопка "закрыть" в форме отправки данных в карточке товара
  $('.product-card__form-close').on('click', function () {
    $('.product-card__form').css('display', 'none');
  })
});



