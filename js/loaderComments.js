'use strict';

(function () {
  var COUNT_COMMENTS = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var commentLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var counter = 0;
  var startCounter = 0;

  // Сбрасывает счетчики
  var resetCounter = function () {
    counter = 0;
    startCounter = 0;
  };

  // Создаем комментарий
  var createComment = function (comment) {
    var commentElement = bigPictureElement.querySelector('.social__comment');
    var elementDescription = commentElement.cloneNode(true);

    elementDescription.querySelector('.social__text').textContent = comment.message;
    elementDescription.querySelector('.social__picture').src = comment.avatar;

    return elementDescription;
  };

  // Встваляет счетчик комментариев в разметку
  var insertCountComments = function (numberСomments) {
    var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    var stringCountCommentElement = commentCountElement.innerHTML = counter + ' из <span class="comments-count">' + numberСomments + '</span> комментариев';

    return stringCountCommentElement;
  };

  // Получаем фрагмент массива комментарие и вызываем счетчик комментариев
  var getFragmentCommentsList = function (comments) {
    var fragment = document.createDocumentFragment();
    var numberСomments = comments.length;

    for (var i = startCounter; i < COUNT_COMMENTS + startCounter; i++) {
      if (counter === numberСomments) {
        commentLoaderElement.classList.add('hidden');
        insertCountComments(numberСomments);
        break;
      } else {
        fragment.appendChild(createComment(comments[i]));
        counter++;

        if (counter === numberСomments) {
          commentLoaderElement.classList.add('hidden');
        }
      }
    }

    insertCountComments(numberСomments);

    startCounter += 5;
    return fragment;
  };

  window.loaderComments = {
    getFragmentCommentsList: getFragmentCommentsList,
    resetCounter: resetCounter
  };
})();
