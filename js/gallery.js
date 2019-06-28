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
    var similarListElement = document.querySelector('.pictures');

    for (var i = 0; i < descriptionPhotos.length; i++) {
      fragment.appendChild(renderDescriptionElement(descriptionPhotos[i]));
    }

    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorHadler');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Выводим фото на дисплей
  window.backend.load(generateDescriptionList, errorHandler);

})();

