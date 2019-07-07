'use strict';

(function () {
  var imgUploadElement = document.querySelector('.img-upload__preview-container');
  var scaleControlValueElement = imgUploadElement.querySelector('.scale__control--value');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');
  var imgPreviewElement = uploadPreviewElement.querySelector('img');

  var currentTransformScaleNumber;
  var currentScaleInputNumber;

  // Получаем значение при +
  var onPlusScale = function () {
    if (parseInt(scaleControlValueElement.value, 10) >= 100) {
      return;
    }

    currentTransformScaleNumber = parseInt(scaleControlValueElement.value, 10) / 100 + 0.25;
    currentScaleInputNumber = parseInt(scaleControlValueElement.value, 10) + 25 + '%';

    imgPreviewElement.style.transform = 'scale(' + currentTransformScaleNumber + ')';
    scaleControlValueElement.value = currentScaleInputNumber;
  };

  // Получаем значение при -
  var onMinusScale = function () {
    if (parseInt(scaleControlValueElement.value, 10) <= 25) {
      return;
    }

    currentTransformScaleNumber = parseInt(scaleControlValueElement.value, 10) / 100 - 0.25;
    currentScaleInputNumber = parseInt(scaleControlValueElement.value, 10) - 25 + '%';

    imgPreviewElement.style.transform = 'scale(' + currentTransformScaleNumber + ')';
    scaleControlValueElement.value = currentScaleInputNumber;
  };

  // Сброс значений зума
  var resetScaleValue = function () {
    imgPreviewElement.removeAttribute('style');
    scaleControlValueElement.value = '100%';
    currentTransformScaleNumber = 1;
    currentScaleInputNumber = 100;
  };

  window.scaleImage = {
    onPlusScale: onPlusScale,
    onMinusScale: onMinusScale,
    resetScaleValue: resetScaleValue
  };
})();
