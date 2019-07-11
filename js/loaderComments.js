'use strict';

(function () {
  var COUNT_COMMENTS = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var commentIndex = 0;

  // Создаем комментарий
  var createComment = function (comment) {
    var commentElement = bigPictureElement.querySelector('.social__comment');
    var elementDescription = commentElement.cloneNode(true);

    elementDescription.querySelector('.social__text').textContent = comment.message;
    elementDescription.querySelector('.social__picture').src = comment.avatar;

    return elementDescription;
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

    while (commentIndex < comments.length && i < COUNT_COMMENTS) {
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
