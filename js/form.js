'use strict';

// Перемещние пина слайдера и изменение глубины эффекта
(function () {
  var imgUploadElement = document.querySelector('.img-upload');
  var uploadFileElement = document.querySelector('#upload-file');
  var formEditionElement = imgUploadElement.querySelector('.img-upload__overlay');
  var uploadFormElement = imgUploadElement.querySelector('.img-upload__form');
  var zoomOutButtonElement = formEditionElement.querySelector('.scale__control--smaller');
  var zoomInButtonElement = formEditionElement.querySelector('.scale__control--bigger');
  var inputHashtagElement = document.querySelector('.text__hashtags');

  // Валидатор инпута
  var validationInput = function (input) {
    window.validator.validator.checkValidity(input);
  };

  // Загрузчик фотографий
  var onEditionEscPress = function (evt) {
    var ESC_KEYCODE = 27;
    var textAreaElement = document.querySelector('.text__description:focus');
    var inputFocusElement = document.querySelector('.text__hashtags:focus');

    if (evt.keyCode === ESC_KEYCODE && !textAreaElement && !inputFocusElement) {
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
    inputHashtagElement.removeEventListener('input', onInputValidation);
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

  // Обработчик инпута
  var onInputValidation = function (e) {
    validationInput(e.target);
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

    inputHashtagElement.addEventListener('input', onInputValidation);

    // Обработчики зума
    zoomInButtonElement.addEventListener('click', onPlusScale);
    zoomOutButtonElement.addEventListener('click', onMinusScale);

    // Обработчик закрытия окна
    var editionCloseElement = imgUploadElement.querySelector('.img-upload__cancel');
    editionCloseElement.addEventListener('click', function () {
      closeFormEdition();
    });
  });
})();
