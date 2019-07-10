'use strict';

(function () {
  function CustomValidation() { }

  CustomValidation.prototype = {
    // Установим пустой массив сообщений об ошибках
    invalidities: [],

    // Метод, проверяющий валидность
    checkValidity: function (input) {

      var validity = input.validity;

      if (validity.patternMismatch) {
        this.addInvalidity('This is the wrong pattern for this field');
      }

      if (validity.rangeOverflow) {
        var max = getAttributeValue(input, 'max');
        this.addInvalidity('The maximum value should be ' + max);
      }

      if (validity.rangeUnderflow) {
        var min = getAttributeValue(input, 'min');
        this.addInvalidity('The minimum value should be ' + min);
      }

      if (validity.stepMismatch) {
        var step = getAttributeValue(input, 'step');
        this.addInvalidity('This number needs to be a multiple of ' + step);
      }

      // И остальные проверки валидности...
    },

    // Добавляем сообщение об ошибке в массив ошибок
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },

    // Получаем общий текст сообщений об ошибках
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };

  var submit = document.querySelector('.img-upload__submit');
  // Добавляем обработчик клика на кнопку отправки формы
  submit.addEventListener('click', function (e) {
    var input = document.querySelector('.text__hashtags');
    // Пройдёмся по всем полям
    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() === false) {

      var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
      inputCustomValidation.checkValidity(input); // Выявим ошибки
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      input.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке

    } // закончился if
  });
})();
