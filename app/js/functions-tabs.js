$(document).ready(function () {


  $('.capability__tab').on('click', function() {
    let idTab = $(this).attr('data-tab');
    let content = $('.capability__content[data-tab="' + idTab +'"]');
    
    $('.capability__tab.active').removeClass('active');
    $(this).addClass('active');

    $('.capability__content.active').removeClass('active');
    content.addClass('active');

  })


});