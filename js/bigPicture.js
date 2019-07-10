'use strict';

(function () {
  var COUNT_COMMENTS = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var similarListElement = document.querySelector('.social__comments');
  var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var comments;
  var counter = 0;
  var startCounter = 0;

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

  // Встваляет счетчик комментариев в разметку
  var insertCountComments = function () {
    var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    var stringCountCommentElement = commentCountElement.innerHTML = counter + ' из <span class="comments-count">' + comments.length + '</span> комментариев';

    return stringCountCommentElement;
  };

  // Получаем фрагмент массива комментарие и вызываем счетчик комментариев
  var getFragmentCommentsList = function () {
    var fragment = document.createDocumentFragment();

    for (var i = startCounter; i < COUNT_COMMENTS + startCounter; i++) {
      if (counter === comments.length) {
        commentLoaderElement.classList.add('hidden');
        insertCountComments();
        break;
      } else {
        fragment.appendChild(createComment(comments[i]));
        counter++;

        if (counter === comments.length) {
          commentLoaderElement.classList.add('hidden');
        }
      }
    }

    insertCountComments();

    startCounter += 5;
    return fragment;
  };

  // Создаем и выводим фото с комментариями
  var displayBigPicture = function (dataPhoto) {
    var pictureImgElement = bigPictureElement.querySelector('.big-picture__img');
    var pictureImgSrcElement = pictureImgElement.querySelector('img');
    var likesCountElement = bigPictureElement.querySelector('.likes-count');
    var commentsCountElement = bigPictureElement.querySelector('.comments-count');
    var socialCaption = bigPictureElement.querySelector('.social__caption');
    comments = dataPhoto.comments;

    var firstLoadCommentList = getFragmentCommentsList(comments);
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
    commentLoaderElement.classList.remove('hidden');

    counter = 0;
    startCounter = 0;

    commentLoaderElement.removeEventListener('click', onLoaderComments);
    document.removeEventListener('click', closeBigPictureForm);
  };

  // Обработчик подгрузки комментариев
  var onLoaderComments = function () {
    var fragmentCommentList = getFragmentCommentsList(comments);
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
