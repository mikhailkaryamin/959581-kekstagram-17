'use strict';

// Создаем DOM фрагмент 'Описание фотографии'
(function () {
  var photos = []; // Сохраним загруженные данные
  var renderDescriptionElement = function (dataPhotos) {
    var descriptionTemplateElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var elementDescription = descriptionTemplateElement.cloneNode(true);

    elementDescription.querySelector('.picture__img').src = dataPhotos.url;
    elementDescription.querySelector('.picture__likes').textContent = dataPhotos.likes;
    elementDescription.querySelector('.picture__comments').textContent = dataPhotos.comments.length;

    return elementDescription;
  };

  // Вставляет фрагменты в DOM
  var generateDescriptionList = function (descriptionPhotos) {
    var fragment = document.createDocumentFragment();
    var similarListElement = document.querySelector('.pictures');

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderDescriptionElement(descriptionPhotos[i]));
    }

    similarListElement.appendChild(fragment);
  };

  // Сообщение об ошибке
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-hadler');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (data) {
    photos = data;
    generateDescriptionList(data);
  };

  // Сбрасывает ДОМ
  var resetPicturesDOM = function () {
    var allPicture = document.querySelector('.pictures');
    var picture = document.querySelectorAll('.picture');
    for (var i = 0; i < picture.length; i++) {
      allPicture.removeChild(picture[i]);
    }
  };

  // Сбрасываем класс актив при переключении
  var resetActiveClass = function () {
    var header = document.querySelector('.img-filters__form');
    var btns = header.querySelectorAll('button');
    var buttonElement = 'img-filters__button';
    var buttonActive = 'img-filters__button  img-filters__button--active';

    btns.forEach(function (button) {
      button.className = buttonElement;
      button.addEventListener('click', function (evt) {
        if (button !== buttonActive) {
          evt.target.classList.add('img-filters__button--active');
        }
      });
    });
  };

  // Выводим фото на дисплей
  var filterNewElement = document.getElementById('filter-new');
  var filterCommentsElement = document.getElementById('filter-discussed');
  var filterPopularElement = document.getElementById('filter-popular');

  var renderFilteredPopular = function () {
    generateDescriptionList(photos);
  };

  var renderFilteredNew = function () {
    window.filters.filteredNew(photos, generateDescriptionList);
  };

  var renderFilteredComments = function () {
    window.filters.filteredComments(photos, generateDescriptionList);
  };

  filterPopularElement.addEventListener('click', function () {
    resetActiveClass();
    resetPicturesDOM();
    window.debounce.delay(renderFilteredPopular);
  });

  filterNewElement.addEventListener('click', function () {
    resetActiveClass();
    resetPicturesDOM();
    window.debounce.delay(renderFilteredNew);
  });

  filterCommentsElement.addEventListener('click', function () {
    resetActiveClass();
    resetPicturesDOM();
    window.debounce.delay(renderFilteredComments);
  });

  window.backend.load(successHandler, errorHandler);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  resetActiveClass();
})();

