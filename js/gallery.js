'use strict';

// Создаем DOM фрагмент 'Описание фотографии'
(function () {
  var photos = []; // Сохраним загруженные данные
  var buttonsFormElement = document.querySelector('.img-filters__form');
  var picturesElement = document.querySelector('.pictures');

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

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderPhotoElement(descriptionPhotos[i]));
    }

    picturesElement.appendChild(fragment);
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
    picturesElement.addEventListener('click', onPicturesClick);
  };

  // Сбрасывает ДОМ
  var clearPicturesList = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (el) {
      el.remove();
    });
  };

  // Ищем индекс фото
  var getImageData = function (imageSrc) {
    var pictureIndex = photos.map(function (e) {
      return e.url;
    }).indexOf(imageSrc);

    return photos[pictureIndex];
  };

  // Обработчик открытия формы изображения
  var onPicturesClick = function (evt) {
    var target = evt.target;
    var pictureElement = target.closest('.picture');

    if (!pictureElement) {
      return;
    }

    var imageElement = pictureElement.querySelector('.picture__img');
    var imageSrc = imageElement.getAttribute('src');
    var imageData = getImageData(imageSrc);

    window.bigPicture.showBigPicture(imageData);
  };

  window.backend.load(onLoadSuccess, onLoadError);

})();

