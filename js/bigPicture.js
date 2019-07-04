'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
  var picturesElement = document.querySelector('.pictures');

  var displayBigPicture = function (dataPhotos) {
    var comments = dataPhotos[0].comments;
    var pictureImgElement = bigPictureElement.querySelector('.big-picture__img');
    var pictureImgSrcElement = pictureImgElement.querySelector('img');
    var likesCountElement = bigPictureElement.querySelector('.likes-count');
    var commentsCountElement = bigPictureElement.querySelector('.comments-count');
    var socialCaption = bigPictureElement.querySelector('.social__caption');

    var createComment = function (comment) {
      var commentElement = bigPictureElement.querySelector('.social__comment');
      var elementDescription = commentElement.cloneNode(true);

      elementDescription.querySelector('.social__text').textContent = comment.message;
      elementDescription.querySelector('.social__picture').src = comment.avatar;

      return elementDescription;
    };

    var insertCommentsList = function () {
      var fragment = document.createDocumentFragment();
      var similarListElement = document.querySelector('.social__comments');

      comments.forEach(function (comment) {
        fragment.appendChild(createComment(comment));
      });
      similarListElement.appendChild(fragment);

      pictureImgSrcElement.src = dataPhotos[0].url;
      likesCountElement.textContent = dataPhotos[0].likes;
      commentsCountElement.textContent = dataPhotos[0].comments.length;
      socialCaption.textContent = dataPhotos[0].description;
    };

    insertCommentsList();
  };

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPictureForm);
  };

  var closeBigPictureForm = function () {
    bigPictureElement.classList.add('hidden');
  };

  var openBigPictureForm = function () {
    var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');

    bigPictureElement.classList.remove('hidden');
    commentCountElement.classList.add('hidden');
    commentLoaderElement.classList.add('hidden');
  };

  var showBigPicture = function (data) {
    // var smallPictureElement = picturesElement.querySelector('.picture');

    picturesElement.addEventListener('click', function (evt) {
      openBigPictureForm();
      displayBigPicture(data);
      console.log(evt);
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
