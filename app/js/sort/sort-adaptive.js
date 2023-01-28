$(document).ready(function () {
  
  let widthScreen = $(window).width();
  if ($('sorting')) {
    if ((widthScreen < 1170) && (widthScreen > 767)) {
      transferItemForm();
    }
    if (widthScreen < 767) {
      deleteValueButton($('.sorting__options-button'));
      // deleteTextButton($('.sorting__content-paggination--button'))
    };


    function transferItemForm() {
      $('.sorting__form-item--speed').appendTo('.sorting__form-item--ipad');
      $('.sorting__form-item--voltage').appendTo('.sorting__form-item--ipad');
    }
    function deleteValueButton(button) {
      button.val('');
    }
    function deleteTextButton(button) {
      button.text('');
    }
  }
});
