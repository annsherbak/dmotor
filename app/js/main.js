// header drop - down menu

$(document).ready(function () {
  $('.header__dropmenu').removeClass('header__dropmenu-active');

  // hover - эффект при наведении на элемент навигации 'продукция'
  $('.dropmenu__trigger').hover(function () {
    $('.header__dropmenu').toggleClass('header__dropmenu-active');
  });
  // hover - эффект при наведении выпадающее меню
  $(".header__dropmenu").hover(function () {
    $('.header__dropmenu').toggleClass('header__dropmenu-active');
  });


  // скролл меню навигации

  let heigthHeader = 92;
  let heigthWW = 0;
  
    $(window).scroll(function () {

      var top = $(this).scrollTop();
      var elem = $('.header__bottom');
      
      if (top + heigthWW < heigthHeader) {
        console.log('fgergrht');
        elem.css('top', (heigthHeader - top));
      } else {
        elem.css('top', heigthWW);
      }
    });

});

