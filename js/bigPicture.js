'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var similarListElement = document.querySelector('.social__comments');
  var commentsLoaderButtonElement = bigPictureElement.querySelector('.comments-loader');
  var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
  var comments;

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

  // Создаем фрагмент комментариев
  var creatFragmentComments = function (startLoad, finishLoad) {
    var fragment = document.createDocumentFragment();
    for (var i = startLoad; i < finishLoad; i++) {
      fragment.appendChild(createComment(comments[i]));
    }

    return fragment;
  };

  // Счетчик первой загрузки
  var counterStartUp = 0;
  // Индекс массива начала загрузки комментариев
  var startLoaderComment = 0;
  // Индекс массива конца загрузки комментариев
  var finishLoaderComment = 5;

  // Вставляет строку с количеством загруженных и общим количеством комментариев
  var insertStringCountCommentElement = function (x) {
    var flag = x;
    // Ставит нужный флаг, когда комментариев меньше 5, либо когда все комментарии загружены
    var k = flag === 'finish' ? comments.length : startLoaderComment + 5;
    var stringCountCommentElement = commentCountElement.innerHTML = k + ' из <span class="comments-count">' + comments.length + '</span> комментариев';
    return stringCountCommentElement;
  };

  /* Считает начало и конец массива комментариев, затем записываем в переменные "startLoaderComment" и
  "finishLoaderComment", а так же отправляет нужный флаг для строки комментариев*/
  var getStartFinishLoaderComments = function () {
    if (counterStartUp === 0 && comments.length > 5) { // При первой загрузке и комментариев больше 5
      counterStartUp++;
      insertStringCountCommentElement();
    } else if (comments.length < 5) { // При первой загрузке и комментариев меньше 5
      finishLoaderComment = comments.length;
      insertStringCountCommentElement('finish');
      commentsLoaderButtonElement.classList.add('hidden');
    } else if (finishLoaderComment + 5 < comments.length) { // При подгрузке комментариев
      startLoaderComment += 5;
      finishLoaderComment += 5;
      insertStringCountCommentElement();
    } else { // При загрузке оставшихся комментариев
      startLoaderComment += 5;
      finishLoaderComment = comments.length;
      insertStringCountCommentElement('finish');
      commentsLoaderButtonElement.classList.add('hidden');
    }
  };

  // Вставляет комментарии в разметку
  var insertCommentListLoader = function () {
    var fragment = creatFragmentComments(startLoaderComment, finishLoaderComment);
    similarListElement.appendChild(fragment);
    return similarListElement;
  };

  // Встваляет комментарии при первой загрузке большой картинки
  var insertStartupCommentList = function () {
    getStartFinishLoaderComments();
    var fragment = creatFragmentComments(startLoaderComment, finishLoaderComment);
    clearCommentsList();
    similarListElement.appendChild(fragment);
  };

  // Создаем и выводим фото с комментариями
  var displayBigPicture = function (dataPhoto) {
    var pictureImgElement = bigPictureElement.querySelector('.big-picture__img');
    var pictureImgSrcElement = pictureImgElement.querySelector('img');
    var likesCountElement = bigPictureElement.querySelector('.likes-count');
    var commentsCountElement = bigPictureElement.querySelector('.comments-count');
    var socialCaption = bigPictureElement.querySelector('.social__caption');
    comments = dataPhoto.comments;

    insertStartupCommentList();

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
    counterStartUp = 0;
    startLoaderComment = 0;
    finishLoaderComment = 5;
    document.removeEventListener('click', closeBigPictureForm);
    commentsLoaderButtonElement.removeEventListener('click', onLoaderCommentsClick);
  };

  // Обработчик загрузчика комментариев
  var onLoaderCommentsClick = function () {
    getStartFinishLoaderComments();
    insertCommentListLoader();
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
