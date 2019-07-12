'use strict';
(function () {
  var MAX_LENGTH_HASHTAG = 20;

  var isUnique = function (value, index, self) {
    return self.indexOf(value) === index;
  };

  var checkHashtagRepeat = function (arrayValue) {
    var unique = arrayValue.filter(isUnique);
    return unique.length === arrayValue.length;
  };

  var isMaxLength = function (arrayValue) {
    var maxLengthOK;

    arrayValue.forEach(function (el) {
      maxLengthOK = el.length > MAX_LENGTH_HASHTAG ? false : true;
      return maxLengthOK;
    });

    return maxLengthOK;
  };

  var validator = {
    checkValidity: function (input) {
      var value = input.value;

      var stringLowerCase = value.toLowerCase();
      var arrayValue = stringLowerCase.split(' ');


      var errors = [];

      if (!value) {
        input.setCustomValidity('');
        return true;
      }

      if (arrayValue.length > 5) {
        errors.push('Нельзя указать больше пяти хэш-тегов');
      }

      if (!value.match(/^#/)) {
        errors.push('Значение должно начинаться с #');
      }

      if (value.match(/^#/) && value.length === 1) {
        errors.push('Хеш-тег не может состоять только из одной решётки');
      }

      if (!checkHashtagRepeat(arrayValue)) {
        errors.push('Один и тот же хэш-тег не может быть использован дважды');
      }

      if (!isMaxLength(arrayValue)) {
        errors.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      }

      input.setCustomValidity(errors.join('. '));
      return errors.length ? false : true;
    },
  };

  window.validator = {
    validator: validator
  };
})();
