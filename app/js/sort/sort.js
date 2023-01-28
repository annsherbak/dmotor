$(document).ready(function () {

  if ($('.sorting')) {

    let ui = {
      $form: $('#filters-form'),
      $resetButton: $('#form__reset-button'),
      $sliderPower: $('#slider-power'),
      $inputSliderPower: $('.sorting__form-inputs--power'),
      $powerLabelMin: $('#power-label-min'),
      $powerLabelMax: $('#power-label-max'),
      $torqueLabelMin: $('#power-torque-min'),
      $torqueLabelMax: $('#power-torque-max'),
      $minPower: $('#min-power'),
      $maxPower: $('#max-power'),
      $checkboxsFlange: $('#checkboxs-flange'),
      $checkboxFlange: $('#checkboxs-flange input'),
      $checkboxsEncoder: $('#checkboxs-encoder'),
      $checkboxEncoder: $('#checkboxs-encoder input'),
      $checkboxsVoltage: $('#checkboxs-voltage'),
      $checkboxVoltage: $('#checkboxs-voltage input'),
      $checkboxsSpeed: $('#checkboxs-speed'),
      $checkboxSpeed: $('#checkboxs-speed input'),
      $goods: $('#goods'),
      $template: $('#goods-template')
    }
    let template = _.template(ui.$template.html());

    $(function () {
      //запускаем горизонтальный слайдер для подбора по мощности
      $("#slider-power").slider({
        range: true,
        min: 0,
        max: 22000,
        step: 50,
        values: [50, 22000],
        slide: function (event, ui) {
          $("#min-power").val(ui.values[0]);
          $("#max-power").val(ui.values[1]);
          $('#power-input-min').val($("#min-power").attr("value"));
          $('#power-input-max').val($("#max-power").attr("value"));

        },

        change: getData
      });
      //конструкция для изменения параметров при введении данных в инпуты для мощности
      $('.sorting__form-inputs--power').change(function () {
        $("#slider-power").slider({
          values: [($('#power-input-min').val()), $('#power-input-max').val()],
          change: function (event, ui) {
            $("#min-power").val(ui.values[0]);
            $("#max-power").val(ui.values[1]);
            getData();
          }
        });
      });
      // запускаем горизонтальный слайдер для подбора по номинальному моменту
      $("#slider-torque").slider({
        range: true,
        min: 0,
        max: 140,
        values: [0.16, 140],
        slide: function (event, ui) {
          $("#min-torque").val(ui.values[0]);
          $("#max-torque").val(ui.values[1]);
          $('#power-torque-min').val($("#min-torque").attr("value"));
          $('#power-torque-max').val($("#max-torque").attr("value"));
        },
        change: getData
      });
      //конструкция для изменения параметров при введении данных в инпуты для момента
      $('.sorting__form-inputs--torque').change(function () {
        $("#slider-torque").slider({
          values: [($('#power-torque-min').val()), $('#power-torque-max').val()],
          change: function (event, ui) {
            $("#min-torque").val(ui.values[0]);
            $("#max-torque").val(ui.values[1]);
            getData();
          }

        });
      });


    });


    // Инициализация модуля
    function init() {
      imposeHandlers()
      getData();
    }
    init()

    //навешиваем события
    function imposeHandlers() {
      ui.$checkboxFlange.on('change', getData);
      ui.$checkboxEncoder.on('change', getData);
      ui.$checkboxVoltage.on('change', getData);
      ui.$checkboxSpeed.on('change', getData);
      ui.$resetButton.on('click', getData);
      ui.$inputSliderPower.on('change', getData);


    }

    //Отправка данных на сервер
    function getData() {

      let filterData = ui.$form.serialize();
      $.ajax({
        url: 'php/sort.php',
        data: filterData,
        type: 'GET',
        cache: false,
        dataType: 'json',
        error: catalogError,
        success: function (responce) {
          if (responce.code === 'success') {
            catalogSuccess(responce);
          } else {
            catalogError(responce);
          }
        }

      });
    }

    // Ошибка получения данных
    function catalogError(responce) {
      console.error('responce', responce);

    }

    // Успешное получение данных
    function catalogSuccess(responce) {
      ui.$goods.html(template({ goods: responce.result }));


      if (ui.$goods) {
        newEncoderData();
        counterCardResult();
        paginationCard();
      }
      //измение значений энкодера (с БД приходят значения 1,2,3,4);
      function newEncoderData() {
        let CardData = $('.sorting__content-card');
        for (item of CardData) {
          let CardEncoderType = $(item).find('.card__feature-encoder--type');
          let CardEncoderTypeText = CardEncoderType.text();
          let CardEncoderPermit = $(item).find('.card__feature-encoder--permit');

          switch (CardEncoderTypeText) {
            case '1':
              (CardEncoderType.text('Абс.оптич. 23‑бит'));
              (CardEncoderPermit.text('8 388 608 имп/об'));
              break;
            case '2':
              (CardEncoderType.text('Абс.магн. 17‑бит'));
              (CardEncoderPermit.text('131 072 имп/об'));
              break;
            case '3':
              (CardEncoderType.text('Инкр.оптич. 20-бит'));
              (CardEncoderPermit.text('1 048 576 имп/об'));
              break;
            case '4':
              (CardEncoderType.text('Резолвер'));
              (CardEncoderPermit.text('65 536 имп/об'));
              break;
            case '5':
              (CardEncoderType.text('Абс.оптич. 17‑бит'));
              (CardEncoderPermit.text('131 072 имп/об'));
              break;
          }
        };
      }
      function counterCardResult() {
        let amountCardResult = $('.sorting__content-card').length;
        $('.sorting__content-counter').text(`Найдено ${amountCardResult}`);
      }

      function paginationCard() {
        let CardResult = $('.sorting__content-card');
        let amountCardResult = $('.sorting__content-card').length;
        let numberItem = 9;
        //число страниц пагинации
        let numberPaginationElements = Math.ceil(amountCardResult / numberItem);
        ($('.sorting__content-paggination--pages')).html('');

        //создание элементов страниц пагинации
        //если карточек товаров больше, чем число выводимых элементов на странице numberItem, то запускаем пагинацию, если меньше просто выводим карточки и скрываем меню пагинации
        if (CardResult.length > numberItem) {
          $('.sorting__content-warning').hide();
          $('.sorting__content-list').show();
          $('.sorting__content-paggination').removeClass('inactive');
          creationPagginationElement();
          activatePagination();
          //если нет подходящих вариантов активируем предупреждение и скрываем меню пагинации
        } else if (CardResult.length == 0) {
          console.log(CardResult.length);
          $('.sorting__content-warning').show()
          $('.sorting__content-list').hide();
          console.log('ggggg');
          $('.sorting__content-paggination').addClass('inactive');
        }
        else {
          CardResult.addClass('active');
          $('.sorting__content-warning').hide();
          $('.sorting__content-paggination').addClass('inactive');
          $('.sorting__content-list').show();
        }


        function creationPagginationElement() {
          //создание элементов пагинации
          for (let i = 1; i <= numberPaginationElements; i++) {
            ($('.sorting__content-paggination--pages')).append(
              `<li data-page = "${i}" class="sorting__content-paggination--page">${i}</li>`
            )
          }
        }


        function activatePagination() {
          let serialNumberPagginationPage;
          let elementPagginationPage = $('.sorting__content-paggination--page');
          activateNumberingPaggination();
          activateButtonPaggination();


          function makeCardActive(item) {
            $.each(CardResult, function (index, value) {
              if ((numberItem * (item - 1)) <= index && index <= ((numberItem * item) - 1)) {
                $(this).addClass('active');
              }
            });
          };
          function makeElementNoActive() {
            elementPagginationPage.removeClass('active');
            CardResult.removeClass('active');
          }
          function scrollTopContent() {
            $('html, body').animate({
              scrollTop: $(".sorting__content-counter").offset().top // класс объекта к которому приезжаем
            }, 1000); // Скорость прокрутки
          }

          //активация меню пагинации
          function activateNumberingPaggination() {
            $.each(elementPagginationPage, function (index, value) {

              //назначение первого элемента меню пагинации активным
              if (index == 0) {
                $(this).addClass('active');
              }
              serialNumberPagginationPage = elementPagginationPage.attr('data-page');
              //назначение карточек первой страницы активными
              makeCardActive(serialNumberPagginationPage);

              //наложение событий на клик по элементам меню пагинации
              $(this).on('click', function () {

                //скроллим вверх до карточек контента
                scrollTopContent()

                //удаляем активный класс у всех карточек и элементов меню пагинации
                makeElementNoActive();

                $(this).addClass('active');

                //переназначаем переменную после клика
                serialNumberPagginationPage = ($('.sorting__content-paggination--page.active')).attr('data-page');

                //назначаем активными карточками в зависимости от элемента меню пагинации
                makeCardActive(serialNumberPagginationPage);

                //если элемент меню пагинации последний в списке, назначаем класс элементу пагинации
                if (serialNumberPagginationPage == elementPagginationPage.length) {
                  $('.sorting__content-paggination--next').addClass('inactive');
                  $('.sorting__content-paggination--back').removeClass('inactive');
                }
                else if (serialNumberPagginationPage == 1) {
                  $('.sorting__content-paggination--back').addClass('inactive');
                  $('.sorting__content-paggination--next').removeClass('inactive');
                }

                else {
                  $('.sorting__content-paggination--next').removeClass('inactive');
                  $('.sorting__content-paggination--back').removeClass('inactive');
                };


              });
            });
          }


          function activateButtonPaggination() {
            activateButtonNextPaggination();
            activateButtonPrevPaggination();


            function activateButtonNextPaggination() {
              //решение бага с преумножением обработчиков событий
              $('.sorting__content-paggination--next').off();

              //обработка события при нажатии на кнопку меню пагинации "Дальше"
              $('.sorting__content-paggination--next').on('click', function (event) {

                serialNumberPagginationPage = ($('.sorting__content-paggination--page.active')).attr('data-page');
                let nextPagginationPage = (+(serialNumberPagginationPage) + 1);

                //следующий элемент меню пагинации после активного 
                let nextActiveElement = $('.sorting__content-paggination--page.active').next();

                //проверка на пустоту следуещего элемента
                if (nextActiveElement.length !== 0) {
                  //скроллим вверх до карточек контента
                  scrollTopContent()

                  //удаляем активный класс у всех карточек и элементов меню пагинации
                  makeElementNoActive();

                  //добавляем активный класс на следующий элемент после активного элемента до события
                  nextActiveElement.addClass('active');

                  //назначаем активными карточками в зависимости от элемента меню пагинации
                  makeCardActive(nextPagginationPage);

                  //перезаписываем значение следующего элемента после активного
                  nextActiveElement = $('.sorting__content-paggination--page.active').next();
                  //скрываем кнопку меню пагинации "Дальше", если активный элемент пагинации последний 
                  if (nextActiveElement.length == 0) {
                    $('.sorting__content-paggination--next').addClass('inactive');
                    $('.sorting__content-paggination--back').removeClass('inactive');
                  } else {
                    $('.sorting__content-paggination--next').removeClass('inactive');
                    $('.sorting__content-paggination--back').removeClass('inactive');
                  };
                };

              });
            };

            function activateButtonPrevPaggination() {
              //решение бага с преумножением обработчиков событий
              $('.sorting__content-paggination--back').off();
              //обработка события при нажатии на кнопку меню пагинации "Назад"
              $('.sorting__content-paggination--back').on('click', function (event) {

                serialNumberPagginationPage = ($('.sorting__content-paggination--page.active')).attr('data-page');
                let nextPagginationPage = serialNumberPagginationPage - 1;
                let prevActiveElement = $('.sorting__content-paggination--page.active').prev();

                if (prevActiveElement.length !== 0) {
                  //скроллим вверх до карточек контента
                  scrollTopContent()
                  //удаляем активный класс у всех карточек и элементов меню пагинации
                  makeElementNoActive();

                  //добавлячем активный класс на следующий элемент после активного элемента до события
                  prevActiveElement.addClass('active');

                  //назначаем активными карточками в зависимости от элемента меню пагинации
                  makeCardActive(nextPagginationPage);

                  prevActiveElement = $('.sorting__content-paggination--page.active').prev();
                  if (prevActiveElement.length == 0) {
                    $('.sorting__content-paggination--back').addClass('inactive');
                    $('.sorting__content-paggination--next').removeClass('inactive');
                  } else {
                    $('.sorting__content-paggination--back').removeClass('inactive');
                    $('.sorting__content-paggination--next').removeClass('inactive');
                  };
                };
              });
            };


          };
        }
      };
    };
  };



});





