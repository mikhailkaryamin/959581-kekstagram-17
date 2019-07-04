'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
  var picturesElement = document.querySelector('.pictures');

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
    var comments = bigPictureElement.querySelectorAll('.social__comment');
    comments.forEach(function (el) {
      el.remove();
    });
  };

  // Создаем и выводим фото с комментариями
  var displayBigPicture = function (dataPhoto) {
    var comments = dataPhoto.comments;
    var pictureImgElement = bigPictureElement.querySelector('.big-picture__img');
    var pictureImgSrcElement = pictureImgElement.querySelector('img');
    var likesCountElement = bigPictureElement.querySelector('.likes-count');
    var commentsCountElement = bigPictureElement.querySelector('.comments-count');
    var socialCaption = bigPictureElement.querySelector('.social__caption');

    // Вставляем комментарии
    var insertCommentsList = function () {
      var fragment = document.createDocumentFragment();
      var similarListElement = document.querySelector('.social__comments');

      comments.forEach(function (comment) {
        fragment.appendChild(createComment(comment));
      });

      clearCommentsList();

      similarListElement.appendChild(fragment);

      pictureImgSrcElement.src = dataPhoto.url;
      likesCountElement.textContent = dataPhoto.likes;
      commentsCountElement.textContent = dataPhoto.comments.length;
      socialCaption.textContent = dataPhoto.description;
    };

    insertCommentsList();
  };

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPictureForm);
  };

  var closeBigPictureForm = function () {
    bigPictureElement.classList.add('hidden');
  };

  // Открытие формы
  var openBigPictureForm = function () {
    var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');

    bigPictureElement.classList.remove('hidden');
    commentCountElement.classList.add('hidden');
    commentLoaderElement.classList.add('hidden');
  };

  var searchIndexPicture = function (evt, pictures) {
    var currentPicture = evt.target.attributes.src.nodeValue;

    // Ищем индекс фото
    var pictureIndex = pictures.map(function (e) {
      return e.url;
    }).indexOf(currentPicture);

    return pictureIndex;
  };
  // Обработчик события(открытие окна)
  var showBigPicture = function (data) {

    picturesElement.addEventListener('click', function (evt) {
      var indexPicture = searchIndexPicture(evt, data);

      openBigPictureForm();

      displayBigPicture(data[indexPicture]);


      bigPictureCloseElement.addEventListener('click', function () {
        bigPictureElement.classList.add('hidden');
      });

      document.addEventListener('keydown', onFormEscPress);
    });
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
