'use strict';

(function () {
  var EFFECT_SETTINGS = {
    chrome: {
      minValue: 0,
      maxValue: 1
    },

    sepia: {
      minValue: 0,
      maxValue: 1
    },

    marvin: {
      minValue: 0,
      maxValue: 100
    },

    phobos: {
      minValue: 0,
      maxValue: 3
    },

    heat: {
      minValue: 1,
      maxValue: 3
    }
  };

  var currentFilterName = 'none';
  var currentFilterClassName = '';
  var imgPreviewElement = document.querySelector('.img-upload__preview');
  var sliderElement = document.querySelector('.img-upload__effect-level');
  var levelEffectValueElement = document.querySelector('.effect-level__value');

  // Расчет эффекта от положения пина
  var getEffectValue = function (value) {
    if (currentFilterName !== 'none') {
      var maxValue = EFFECT_SETTINGS[currentFilterName].maxValue;
      var minValue = EFFECT_SETTINGS[currentFilterName].minValue;
      var range = maxValue - minValue;
      var effectValue = range * value / 100 + minValue;
    }
    return effectValue;
  };

  // Делаем строку эффекта
  var getEffectString = function (levelEffect) {
    var effectString;
    switch (currentFilterName) {
      case 'chrome':
        effectString = 'grayscale(' + levelEffect + ')';
        break;
      case 'sepia':
        effectString = 'sepia(' + levelEffect + ')';
        break;
      case 'marvin':
        effectString = 'invert(' + levelEffect + '%)';
        break;
      case 'phobos':
        effectString = 'blur(' + levelEffect + 'px)';
        break;
      case 'heat':
        effectString = 'brightness(' + levelEffect + ')';
        break;
      default:
        effectString = '';
        break;
    }
    return effectString;
  };

  // Задает эффект при смене
  var setEffectChange = function (evt) {
    resetPreview();
    currentFilterName = evt.target.value;
    setEffectPreview(evt.target.value);
  };

  // Накладываем эффекты на фото
  var setEffectPreview = function (effectName) {

    resetClassPreview();

    if (effectName !== 'none') {
      sliderElement.classList.remove('hidden');
      currentFilterClassName = 'effects__preview--' + effectName;
      imgPreviewElement.classList.add(currentFilterClassName);
    } else {
      sliderElement.classList.add('hidden');
      currentFilterClassName = '';
      imgPreviewElement.style.filter = '';
    }
  };


  // Сброс при переключении эффекта
  var resetPreview = function () {
    var levelLineElement = document.querySelector('.effect-level__line');
    var levelPinElement = levelLineElement.querySelector('.effect-level__pin');
    var levelDepthElement = levelLineElement.querySelector('.effect-level__depth');
    levelPinElement.style.left = '100%';
    levelDepthElement.style.width = '100%';
    levelEffectValueElement.value = 100;
    imgPreviewElement.style = '';
  };

  var resetFormEdition = function () {
    var scaleControlElement = document.querySelector('.scale__control--value');

    resetClassPreview();
    resetPreview();

    currentFilterName = 'none';
    currentFilterClassName = '';
    scaleControlElement.value = '100%';
    sliderElement.classList.add('hidden');
  };

  // Сбрасывает класс формы
  var resetClassPreview = function () {
    if (currentFilterClassName) {
      imgPreviewElement.classList.remove(currentFilterClassName);
    }
  };

  // Задаем эффект
  var setEffect = function (left) {
    var levelEffect = getEffectValue(left);
    var stringLevelEffect = getEffectString(levelEffect);

    // Записываем строку в стайл
    imgPreviewElement.style.filter = stringLevelEffect;

    // Записываем значение в инпут
    levelEffectValueElement.value = left;
  };

  // Интерфейс модуля
  window.effects = {
    setEffectChange: setEffectChange,
    resetFormEdition: resetFormEdition,
    setEffect: setEffect,
  };
})();
