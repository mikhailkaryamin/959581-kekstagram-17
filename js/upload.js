'use strict';

(function () {
  var imgUploadElement = document.querySelector('.img-upload');
  var mainElement = document.querySelector('main');
  var formEditionElement = imgUploadElement.querySelector('.img-upload__overlay');
  var uploadFormElement = imgUploadElement.querySelector('.img-upload__form');

  // Получаем окно статуса загрузки
  var renderWindowStatusUpload = function (statusUpload) {
    var elementContent = statusUpload.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(elementContent);
    mainElement.appendChild(fragment);
  };

  // Проверяет клик вне окна или нет
  var isClickOutside = function (evt, cssSelector) {
    var target = evt.target;
    var otherElement = target.closest(cssSelector);

    return !otherElement;
  };

  // Окно успешной загрузки фото
  var showUploadSuccessWindow = function () {
    var successUploadElement = document.querySelector('#success')
    .content
    .querySelector('.success');

    renderWindowStatusUpload(successUploadElement);

    var closeButtonElement = document.querySelector('.success__button');

    closeButtonElement.addEventListener('click', closeWindowUploadSuccess);
    mainElement.addEventListener('click', successWindowElement);
    document.addEventListener('keydown', onFormEscPress);
  };

  // Закрытие окна успешной загрузки
  var removeWindowSuccessUpload = function () {
    var succesWindowElement = mainElement.querySelector('.success');
    succesWindowElement.remove();

    mainElement.removeEventListener('click', successWindowElement);
    document.removeEventListener('keydown', onFormEscPress);
  };

  // Закрытие формы успешной загрузки по клику вне окна
  var successWindowElement = function (evt) {
    var cssSelector = '.success__inner';

    if (isClickOutside(evt, cssSelector)) {
      removeWindowSuccessUpload();
    }
  };

  // Закрытие формы успешной по ESC
  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeWindowUploadSuccess);
  };

  // Обработчик закрытия успешной загрузки
  var closeWindowUploadSuccess = function () {
    var closeButtonElement = document.querySelector('.success__button');

    removeWindowSuccessUpload();
    closeButtonElement.removeEventListener('click', closeWindowUploadSuccess);
  };

  // Окно ошибки загрузки фото
  var showUploadErrorWindow = function () {
    var errorUploadElement = document.querySelector('#error')
    .content
    .querySelector('.error');

    renderWindowStatusUpload(errorUploadElement);
    var errorButtonElement = document.querySelector('.error__buttons');

    errorButtonElement.addEventListener('click', closeWindowUploadError);
    mainElement.addEventListener('click', closeWindowOutsideError);
    document.addEventListener('keydown', onFormErrorEscPress);
  };

  // Закрытие окна ошибки загрузки
  var removeWindowErrorUpload = function () {
    var errorUploadElement = document.querySelector('.error');

    errorUploadElement.remove();

    mainElement.removeEventListener('click', closeWindowOutsideError);
    document.removeEventListener('keydown', onFormErrorEscPress);
  };

  // Закрытие формы ошибки загрузки по клику вне окна
  var closeWindowOutsideError = function (evt) {
    var cssSelector = '.error__inner';

    if (isClickOutside(evt, cssSelector)) {
      removeWindowErrorUpload();
    }
  };

  // Закрытие формы ошибки по ESC
  var onFormErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, closeWindowUploadError);
  };

  // Обработчик закрытия окна ошибки
  var closeWindowUploadError = function () {
    var errorButtonElement = document.querySelector('.error__buttons');

    removeWindowErrorUpload();
    errorButtonElement.removeEventListener('click', closeWindowUploadError);
  };

  // Отправка формы
  var uploadFormImg = function () {
    var data = new FormData(uploadFormElement);

    var onUploadSuccess = function () {
      uploadFormElement.reset();
      formEditionElement.classList.add('hidden');
      showUploadSuccessWindow();
    };

    var onUploadError = function () {
      uploadFormElement.reset();
      formEditionElement.classList.add('hidden');
      showUploadErrorWindow();
    };

    window.backend.uploadForm(data, onUploadSuccess, onUploadError);
  };

  window.upload = {
    uploadFormImg: uploadFormImg
  };
})();
