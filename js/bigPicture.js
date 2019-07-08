'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var similarListElement = document.querySelector('.social__comments');
  var commentsLoaderButtonElement = bigPictureElement.querySelector('.comments-loader');
  var comments;
  var countCommentsMin = 0;
  var countCommentsMax = 5;

  // Создаем комментарий
  var createComment = function (comment) {
    var commentElement = bigPictureElement.querySelector('.social__comment');
    var elementDescription = commentElement.cloneNode(true);

    elementDescription.querySelector('.social__text').textContent = comment.message;
    elementDescription.querySelector('.social__picture').src = comment.avatar;

    return elementDescription;
  };

  // Сбрасывает список комментариев
  var clearCommentsList = function () {
    var commentsElements = bigPictureElement.querySelectorAll('.social__comment');

    commentsElements.forEach(function (el) {
      el.remove();
    });
  };

  // Вствляем комментарии
  var insertListComments = function (startLoad, finishLoad) {
    var fragment = document.createDocumentFragment();
    for (var i = startLoad; i < finishLoad; i++) {
      fragment.appendChild(createComment(comments[i]));
    }

    return fragment;
  };

  // Получаем начало и конец массива комментариев для загрузчика
  var getStartFinishLoaderComments = function () {
    if (countCommentsMax + 5 < comments.length) {
      countCommentsMin += 5;
      countCommentsMax += 5;
    } else {
      countCommentsMin += 5;
      countCommentsMax = comments.length;
      commentsLoaderButtonElement.classList.add('hidden');
    }
    similarListElement.appendChild(insertListComments(countCommentsMin, countCommentsMax));

    return similarListElement;
  };

  // Создаем и выводим фото с комментариями
  var displayBigPicture = function (dataPhoto) {
    var pictureImgElement = bigPictureElement.querySelector('.big-picture__img');
    var pictureImgSrcElement = pictureImgElement.querySelector('img');
    var likesCountElement = bigPictureElement.querySelector('.likes-count');
    var commentsCountElement = bigPictureElement.querySelector('.comments-count');
    var socialCaption = bigPictureElement.querySelector('.social__caption');
    comments = dataPhoto.comments;

    var commentPreLoad = insertListComments(countCommentsMin, countCommentsMax);

    clearCommentsList();

    similarListElement.appendChild(commentPreLoad);

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
    commentsLoaderButtonElement.classList.remove('hidden');
    countCommentsMin = 0;
    countCommentsMax = 5;

    document.removeEventListener('click', closeBigPictureForm);
    commentsLoaderButtonElement.removeEventListener('click', onLoaderCommentsClick);
  };

  // Обработчик загрузчика комментариев
  var onLoaderCommentsClick = function () {
    getStartFinishLoaderComments();
  };

  // Форма с ее содержимым
  var showBigPicture = function (data) {
    var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

    displayBigPicture(data);
    openBigPictureForm();
    commentsLoaderButtonElement.addEventListener('click', onLoaderCommentsClick);
    bigPictureCloseElement.addEventListener('click', closeBigPictureForm);
    document.addEventListener('keydown', onFormEscPress);
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
