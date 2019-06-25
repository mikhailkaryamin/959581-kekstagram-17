'use strict';

// Создаем DOM фрагмент 'Описание фотографии'
(function () {
  var renderDescriptionElement = function (mockDataPhotos) {
    var descriptionTemplateElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var elementDescription = descriptionTemplateElement.cloneNode(true);

    elementDescription.querySelector('.picture__img').src = mockDataPhotos.url;
    elementDescription.querySelector('.picture__likes').textContent = mockDataPhotos.likes;
    elementDescription.querySelector('.picture__comments').textContent = mockDataPhotos.comments.length;

    return elementDescription;
  };

  // Вставляет фрагменты в DOM
  var generateDescriptionList = function (descriptionPhotos) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderDescriptionElement(descriptionPhotos[i]));
    }

    return fragment;
  };

  var insertDescriptionList = function (descriptionPhotosList) {
    var similarListElement = document.querySelector('.pictures');

    similarListElement.appendChild(descriptionPhotosList);
    return similarListElement;
  };

  // Выводим фото на дисплей
  var displayPhotos = function () {
    var mockData = window.data.getMockData();
    var descriptionPhotosList = generateDescriptionList(mockData);

    insertDescriptionList(descriptionPhotosList);
  };

  // Выводит фото на дисплей
  displayPhotos();
})();

