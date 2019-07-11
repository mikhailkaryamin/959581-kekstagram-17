'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var similarListElement = document.querySelector('.social__comments');
  var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var comments;

  // Сбрасывает список комментариев
  var clearCommentsList = function () {
    var commentsElements = bigPictureElement.querySelectorAll('.social__comment');
    commentsElements.forEach(function (el) {
      el.remove();
    });
  };

  // Создаем и выводим фото с комментариями
  var displayBigPicture = function (dataPhoto) {
    var pictureImgElement = bigPictureElement.querySelector('.big-picture__img');
    var pictureImgSrcElement = pictureImgElement.querySelector('img');
    var likesCountElement = bigPictureElement.querySelector('.likes-count');
    var commentsCountElement = bigPictureElement.querySelector('.comments-count');
    var socialCaption = bigPictureElement.querySelector('.social__caption');
    comments = dataPhoto.comments;

    var firstLoadCommentList = window.loaderComments.getCommentListFragment(comments);
    clearCommentsList();

    similarListElement.appendChild(firstLoadCommentList);

    pictureImgSrcElement.src = dataPhoto.url;
    likesCountElement.textContent = dataPhoto.likes;
    commentsCountElement.textContent = dataPhoto.comments.length;
    socialCaption.textContent = dataPhoto.description;
  };

  // Открытие формы
  var openBigPictureForm = function () {
    bigPictureElement.classList.remove('hidden');
  };

  // Закрытие по ESC
  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPictureForm);
  };

  // Обработчик закрытия
  var closeBigPictureForm = function () {
    bigPictureElement.classList.add('hidden');

    window.loaderComments.resetIndex();

    commentLoaderElement.removeEventListener('click', onLoaderComments);
    document.removeEventListener('click', closeBigPictureForm);
  };

  // Обработчик подгрузки комментариев
  var onLoaderComments = function () {
    var fragmentCommentList = window.loaderComments.getCommentListFragment(comments);
    similarListElement.appendChild(fragmentCommentList);
  };

  // Форма с ее содержимым
  var showBigPicture = function (data) {
    var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

    displayBigPicture(data);
    openBigPictureForm();

    commentLoaderElement.addEventListener('click', onLoaderComments);
    bigPictureCloseElement.addEventListener('click', closeBigPictureForm);
    document.addEventListener('keydown', onFormEscPress);
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
