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

  // Окно успешной загрузки фото
  var windowUploadSuccess = function () {
    var successUploadElement = document.querySelector('#success')
    .content
    .querySelector('.success');

    renderWindowStatusUpload(successUploadElement);

    var closeButtonElement = document.querySelector('.success__button');

    closeButtonElement.addEventListener('click', closeWindowUploadSuccess);
    mainElement.addEventListener('click', closeWindowOutsideSuccess);
    document.addEventListener('keydown', onFormEscPress);
  };

  // Закрытие окна успешной загрузки
  var removeWindowSuccessUpload = function () {
    var succesWindowElement = mainElement.querySelector('.success');
    succesWindowElement.remove();

    mainElement.removeEventListener('click', closeWindowOutsideSuccess);
    document.removeEventListener('keydown', onFormEscPress);
  };

  // Закрытие формы успешной загрузки по клику вне окна
  var closeWindowOutsideSuccess = function (evt) {
    var target = evt.target;
    var otherElement = target.closest('.success__inner');

    if (!otherElement) {
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
  var windowUploadError = function () {
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
    var target = evt.target;
    var otherElement = target.closest('.error__inner');

    if (!otherElement) {
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
  var uploadFormImg = function (evt) {
    var data = new FormData(uploadFormElement);

    evt.preventDefault();

    var onUploadSuccess = function () {
      uploadFormElement.reset();
      formEditionElement.classList.add('hidden');
      windowUploadSuccess();
    };

    var onUploadError = function () {
      uploadFormElement.reset();
      formEditionElement.classList.add('hidden');
      windowUploadError();
    };

    window.backend.uploadForm(data, onUploadSuccess, onUploadError);
  };

  window.upload = {
    uploadFormImg: uploadFormImg
  };
})();
