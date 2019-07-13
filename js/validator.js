'use strict';
(function () {
  var MAX_LENGTH_HASHTAG = 20;

  var isUnique = function (value, index, self) {
    return self.indexOf(value) === index;
  };

  var isExceededMaxLength = function (el) {
    return el.length > MAX_LENGTH_HASHTAG;
  };

  var isStartedWithHash = function (el) {
    return el.match(/^#/);
  };

  var hasMinLength = function (el) {
    return el.length > 1;
  };

  var checkValidity = function (input) {
    var hashtagString = input.value;
    var hashagInputElement = document.querySelector('.text__hashtags');
    var normalizedString = hashtagString.toLowerCase();
    var hashtags = normalizedString.split(' ');


    var errors = [];

    if (!hashtagString) {
      input.setCustomValidity('');
      hashagInputElement.classList.remove('text__hashtags--error');
      return true;
    }

    if (hashtags.length > 5) {
      errors.push('Нельзя указать больше пяти хэш-тегов');
    }

    if (!hashtags.every(isStartedWithHash)) {
      errors.push('Хеш-тег должен начинаться с #');
    }

    if (!hashtags.every(hasMinLength)) {
      errors.push('Хеш-тег не может состоять только из одной решётки');
    }

    if (!hashtags.every(isUnique)) {
      errors.push('Один и тот же хэш-тег не может быть использован дважды');
    }

    if (hashtags.some(isExceededMaxLength)) {
      errors.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    }

    if (errors.length) {
      hashagInputElement.classList.add('text__hashtags--error');
    } else {
      hashagInputElement.classList.remove('text__hashtags--error');
    }

    input.setCustomValidity(errors.join('. '));

    return errors.length ? false : true;
  };

  window.validator = {
    checkValidity: checkValidity
  };
})();
