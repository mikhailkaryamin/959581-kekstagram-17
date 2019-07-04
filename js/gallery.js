'use strict';

// Создаем DOM фрагмент 'Описание фотографии'
(function () {
  var photos = []; // Сохраним загруженные данные
  var buttonsFormElement = document.querySelector('.img-filters__form');

  var renderPhotoElement = function (dataPhotos) {
    var pictureElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var elementDescription = pictureElement.cloneNode(true);

    elementDescription.querySelector('.picture__img').src = dataPhotos.url;
    elementDescription.querySelector('.picture__likes').textContent = dataPhotos.likes;
    elementDescription.querySelector('.picture__comments').textContent = dataPhotos.comments.length;

    return elementDescription;
  };

  // Вставляет фрагменты в DOM
  var addPictureList = function (descriptionPhotos) {
    var fragment = document.createDocumentFragment();
    var similarListElement = document.querySelector('.pictures');

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderPhotoElement(descriptionPhotos[i]));
    }

    similarListElement.appendChild(fragment);
  };

  // Сообщение об ошибке
  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var updateButtonsClass = function (activeButton) {
    var buttonElements = buttonsFormElement.querySelectorAll('.img-filters__button');

    buttonElements.forEach(function (buttonEl) {
      buttonEl.classList.remove('img-filters__button--active');
    });

    activeButton.classList.add('img-filters__button--active');
  };

  var updatePicturesList = function (filteredPictures) {
    clearPicturesList();
    addPictureList(filteredPictures);
  };

  var debounceUpdatePicturesList = window.debounce(updatePicturesList);

  var onFilterButtonClick = function (evt) {
    var isTypeButton = evt.target.type === 'button';
    var isActiveButton = evt.target.classList.contains('img-filters__button--active');
    var ButtonIdToFIlterName = {
      'filter-popular': 'filterPopular',
      'filter-new': 'filterNew',
      'filter-discussed': 'filterComments'
    };

    if (!isTypeButton || isActiveButton) {
      return;
    }

    updateButtonsClass(evt.target);
    var filterFunctionName = ButtonIdToFIlterName[evt.target.id];
    var filteredPictures = window.filters[filterFunctionName](photos);

    debounceUpdatePicturesList(filteredPictures);
  };

  var onLoadSuccess = function (data) {
    photos = data;
    addPictureList(data);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    buttonsFormElement.addEventListener('click', onFilterButtonClick);
    window.bigPicture.showBigPicture(photos);
  };

  // Сбрасывает ДОМ
  var clearPicturesList = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (el) {
      el.remove();
    });
  };

  window.backend.load(onLoadSuccess, onLoadError);

})();

