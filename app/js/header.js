$(document).ready(function () {

  let widthScreen = $(window).width();

  let headerDropMenu = $('.header__dropmenu');
  let dropMenuTrigger = $('.dropmenu__trigger');
  let navMenu = $('.header__bottom-nav');
  let burgerBtn = $('.header__bottom-burger');
  let headerBottom = $(".header__bottom");

  if (widthScreen > 1170) {
    dropMenuTrigger.append(headerDropMenu);

    headerDropMenu.removeClass('header__dropmenu-active');

    // hover - эффект при наведении на элемент навигации 'продукция'
    $(dropMenuTrigger).hover(function () {
      headerDropMenu.toggleClass('header__dropmenu-active');
    });
    // hover - эффект при наведении выпадающее меню
    headerDropMenu.hover(function () {
      headerDropMenu.addClass('header__dropmenu-active');
    });
  }
  if (widthScreen <= 1170) {

    navMenu.insertBefore($('.header__dropmenu-list')); // перенос навигационного меню из header__bottom в header drop - down menu
    headerBottom.append(headerDropMenu);
    burgerBtn.on('click', function () {
      headerDropMenu.toggleClass('header__dropmenu-active'); // открытие/закрытие бургер меню
      burgerBtn.toggleClass('active');
    })
  }


  // скролл-меню навигации

  let heigthHeader = $('.header').height();
  let heigthWW = 0;

  $(window).scroll(function () {

    var top = $(this).scrollTop();
    var elem = $('.header__bottom');

    if (top + heigthWW < heigthHeader) {
      elem.css('top', (heigthHeader - top));
    } else {
      elem.css('top', heigthWW);
    }
  });

  //категории в навигации
  let categoryName = $('main').attr('id');
  switch (categoryName) {
    case 'category__contact':
      $('#header__category-contacts').addClass("active");
      break;
    case 'category__main':
      $('#header__category-main').addClass("active");
      break;
    case 'category__product':
      $('#header__category-product').addClass("active");
      break;
    case 'category__capability':
      $('#header__category-capability').addClass("active");
      break;
    case 'category__articles':
      $('#header__category-articles').addClass("active");
      break;

  }
  //открытие поиска на мобильной версии 

  let buttonOpenSearch = $('.header__bottom-form--open');
  let buttonCloseSearch = $('.header__bottom-form--close');
  let search = $('.header__bottom-form');

  buttonOpenSearch.on('click', function () {
    search.css("display", "block");
  })
  buttonCloseSearch.on('click', function (){
    console.log('gfrgdg');
    search.css("display", "none");
  })

});