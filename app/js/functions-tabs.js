$(document).ready(function () {
  if ($('.capability__tabs')) {
    saveActiveTab()
  }

  function saveActiveTab() {
    let idTabLocal = sessionStorage.getItem('tabId'); //проверка на наличие ключа и значения в sessionStorage для сохранение вкладки 

    if (idTabLocal) { //если ключ записан в sessionStorage 

      let activeTab = $('.capability__tab[data-tab="' + idTabLocal + '"]');
      let activeContent = $('.capability__content[data-tab="' + idTabLocal + '"]');

      //снятие активного класса с активных элементов
      $('.capability__tab.active').removeClass('active');
      activeTab.addClass('active');

      $('.capability__content.active').removeClass('active');
      activeContent.addClass('active');

      $('.capability__tab').on('click', function () {
        let idTab = $(this).attr('data-tab');
        let content = $('.capability__content[data-tab="' + idTab + '"]');

        $('.capability__tab.active').removeClass('active');
        $(this).addClass('active');

        $('.capability__content.active').removeClass('active');
        content.addClass('active');

        sessionStorage.setItem('tabId', idTab); //перезаписываем значение в sessionStorage в зависимости от активного таба
      })

    } else { //если ключ не записан в sessionStorage 
      $('.capability__tab').on('click', function () {
        let idTab = $(this).attr('data-tab');
        let content = $('.capability__content[data-tab="' + idTab + '"]');

        $('.capability__tab.active').removeClass('active');
        $(this).addClass('active');

        $('.capability__content.active').removeClass('active');
        content.addClass('active');

        sessionStorage.setItem('tabId', idTab); //записываем значение в sessionStorage в зависимости от активного таба
      })
    }
  }
});