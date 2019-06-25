'use strict';
var currentFilterName = 'none';
var currentFilterClassName = '';
var imgPreviewElement = document.querySelector('.img-upload__preview');

// Расчет эффекта от положения пина
var getEffectValue = function (value) {
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


window.effects = (function () {

  return {
  // Загрузка изображения и редактирование изображения
    editImage: function () {
      var effectsListElement = document.querySelector('.effects__list');

      // Накладываем эффекты на фото
      var setEffectPreview = function (effectName) {
        var sliderElement = document.querySelector('.img-upload__effect-level');

        if (currentFilterClassName) {
          imgPreviewElement.classList.remove(currentFilterClassName);
        }

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

      effectsListElement.addEventListener('change', function (evt) {
        currentFilterName = evt.target.value;
        setEffectPreview(currentFilterName);
      });

    },

    // Сброс при переключении эффекта
    resetFormEdition: function () {
      var scaleControlElement = document.querySelector('.scale__control--value');
      var levelLineElement = document.querySelector('.effect-level__line');
      var levelPinElement = levelLineElement.querySelector('.effect-level__pin');
      var levelDepthElement = levelLineElement.querySelector('.effect-level__depth');

      levelPinElement.style.left = '100%';
      levelDepthElement.style.width = '100%';
      scaleControlElement.value = '100%';
    },

    // Задаем эффект
    setEffect: function (left) {
      var levelEffect = getEffectValue(left);
      var stringLevelEffect = getEffectString(levelEffect);

      // Записываем строку в стайл
      imgPreviewElement.style.filter = stringLevelEffect;

      // Записываем значение в инпут
      var levelEffectValue = document.querySelector('.effect-level__value');
      levelEffectValue.value = left;
    }
  };
})();
