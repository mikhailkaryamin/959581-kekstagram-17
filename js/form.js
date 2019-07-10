'use strict';

// Перемещние пина слайдера и изменение глубины эффекта
(function () {
  var imgUploadElement = document.querySelector('.img-upload');
  var uploadFileElement = document.querySelector('#upload-file');
  var formEditionElement = imgUploadElement.querySelector('.img-upload__overlay');
  var uploadFormElement = imgUploadElement.querySelector('.img-upload__form');
  var zoomOutButtonElement = formEditionElement.querySelector('.scale__control--smaller');
  var zoomInButtonElement = formEditionElement.querySelector('.scale__control--bigger');

  // Загрузчик фотографий
  var onEditionEscPress = function (evt) {
    var ESC_KEYCODE = 27;
    var textAreaElement = document.querySelector('.text__description:focus');

    if (evt.keyCode === ESC_KEYCODE && !textAreaElement) {
      closeFormEdition();
    }
  };

  var closeFormEdition = function () {
    formEditionElement.classList.add('hidden');

    uploadFileElement.value = '';
    window.scaleImage.resetScaleValue();
    zoomOutButtonElement.removeEventListener('click', onPlusScale);
    zoomInButtonElement.removeEventListener('click', onMinusScale);
    document.removeEventListener('keydown', onEditionEscPress);
  };

  var openFormEdition = function () {
    formEditionElement.classList.remove('hidden');
    document.addEventListener('keydown', onEditionEscPress);
  };

  var sliderElem = imgUploadElement.querySelector('.effect-level__line');
  var thumbElem = imgUploadElement.querySelector('.effect-level__pin');
  var levelDepthElement = imgUploadElement.querySelector('.effect-level__depth');

  thumbElem.addEventListener('mousedown', function (e) {
    var thumbCoords = getCoords(thumbElem);
    var shiftX = e.pageX - thumbCoords.left;

    var getSizeElement = function (elem) {
      var elemInfo = elem.getBoundingClientRect();
      var sizeElem = elemInfo.width;
      return sizeElem;
    };

    var sliderSizeElem = getSizeElement(sliderElem);

    var sliderCoords = getCoords(sliderElem);
    var onMouseMove = function (moveEvt) {
      var newLeft = moveEvt.pageX - shiftX - sliderCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = sliderElem.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      // Расчет положения пина
      var left = Math.round(newLeft / sliderSizeElem * 100);
      var percentLeft = left + '%';
      thumbElem.style.left = percentLeft;
      levelDepthElement.style.width = percentLeft;

      // Вызываем применение эффекта
      window.effects.setEffect(left);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);

    return false;
  });

  thumbElem.ondragstart = function () {
    return false;
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  };

  // Обработчики зума
  var onPlusScale = function () {
    window.scaleImage.onPlusScale(1);
  };
  var onMinusScale = function () {
    window.scaleImage.onMinusScale(-1);
  };

  // Открытие попапа и формы редактирования фото
  uploadFileElement.addEventListener('change', function () {
    openFormEdition();
    window.effects.resetFormEdition();
    window.effects.editImage();

    // Обработчик отправки формы
    uploadFormElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.upload.uploadFormImg(evt);
    });

    // Обработчики зума
    zoomInButtonElement.addEventListener('click', onPlusScale);
    zoomOutButtonElement.addEventListener('click', onMinusScale);

    // Обработчик закрытия окна
    var editionCloseElement = imgUploadElement.querySelector('.img-upload__cancel');
    editionCloseElement.addEventListener('click', function () {
      closeFormEdition();
    });
  });


  // //--------------------------------------
  // function CustomValidation() { }

  // CustomValidation.prototype = {
  //   // Установим пустой массив сообщений об ошибках
  //   invalidities: [],

  //   // Метод, проверяющий валидность
  //   checkValidity: function (input) {

  //     var validity = input.validity;

  //     if (validity.patternMismatch) {
  //       this.addInvalidity('This is the wrong pattern for this field');
  //     }

  //     if (validity.rangeOverflow) {
  //       var max = getAttributeValue(input, 'max');
  //       this.addInvalidity('The maximum value should be ' + max);
  //     }

  //     if (validity.rangeUnderflow) {
  //       var min = getAttributeValue(input, 'min');
  //       this.addInvalidity('The minimum value should be ' + min);
  //     }

  //     if (validity.stepMismatch) {
  //       var step = getAttributeValue(input, 'step');
  //       this.addInvalidity('This number needs to be a multiple of ' + step);
  //     }

  //     if (!input.value.match(/[a-z]/g)) {
  //       this.addInvalidity('At least 1 lowercase letter is required');
  //     }

  //     // И остальные проверки валидности...
  //   },

  //   // Добавляем сообщение об ошибке в массив ошибок
  //   addInvalidity: function (message) {
  //     this.invalidities.push(message);
  //   },

  //   // Получаем общий текст сообщений об ошибках
  //   getInvalidities: function () {
  //     return this.invalidities.join('. \n');
  //   }
  // };

  // var submit = document.querySelector('.img-upload__submit');
  // // Добавляем обработчик клика на кнопку отправки формы
  // submit.addEventListener('click', function () {
  //   var input = document.querySelector('.text__hashtags');
  //   // Пройдёмся по всем полям
  //   // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
  //   if (input.checkValidity() === false) {

  //     var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
  //     inputCustomValidation.checkValidity(input); // Выявим ошибки
  //     var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
  //     input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке

  //   } // закончился if
  // });
})();
