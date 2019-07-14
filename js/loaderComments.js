'use strict';

(function () {
  var COMMENTS_COUNT = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var commentIndex = 0;

  // Создаем комментарий
  var createComment = function (comment) {
    var commentElement = bigPictureElement.querySelector('.social__comment');
    var descriptionElement = commentElement.cloneNode(true);

    descriptionElement.querySelector('.social__text').textContent = comment.message;
    descriptionElement.querySelector('.social__picture').src = comment.avatar;

    return descriptionElement;
  };

  // Встваляет счетчик комментариев в разметку
  var insertCommentsCounter = function (numberСomments) {
    var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    var stringCountCommentElement = commentCountElement.innerHTML = commentIndex + ' из <span class="comments-count">' + numberСomments + '</span> комментариев';

    return stringCountCommentElement;
  };

  // Получаем фрагмент массива комментарие и вызываем счетчик комментариев
  var getCommentListFragment = function (comments) {
    var fragment = document.createDocumentFragment();
    var i = 0;

    while (commentIndex < comments.length && i < COMMENTS_COUNT) {
      fragment.appendChild(createComment(comments[commentIndex]));
      commentIndex++;
      i++;
    }

    if (commentIndex < comments.length) {
      commentLoaderElement.classList.remove('hidden');
    } else {
      commentLoaderElement.classList.add('hidden');
    }

    insertCommentsCounter(comments.length);
    return fragment;
  };

  window.loaderComments = {
    getCommentListFragment: getCommentListFragment,
    resetIndex: function () {
      commentIndex = 0;
    }
  };
})();
