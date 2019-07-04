'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');

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

  var openBigPictureForm = function () {
    var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');

    bigPictureElement.classList.remove('hidden');
    commentCountElement.classList.add('hidden');
    commentLoaderElement.classList.add('hidden');
  };

  var showBigPicture = function (data) {
    var pictureElements = document.querySelector('.pictures');
    var smallPictureElement = pictureElements.querySelector('.picture');

    smallPictureElement.addEventListener('click', function () {
      openBigPictureForm();
      displayBigPicture(data);

      var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
      bigPictureCloseElement.addEventListener('click', function () {
        bigPictureElement.classList.add('hidden');
      });
    });
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
