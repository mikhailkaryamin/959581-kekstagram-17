'use strict';
(function () {
  // Фильтр по новым фотографиям
  var filteredNew = function (data, displayPhotos) {
    var counterNewPhotos = 10;
    var newPhotos = data.slice();
    var filteredPhotos = [];

    // Получаем случайный массив фотографий
    while (filteredPhotos.length < counterNewPhotos) {
      var i = Math.floor(Math.random() * (newPhotos.length - 1));
      filteredPhotos.push(newPhotos[i]);
      newPhotos.splice(i, 1);
    }

    displayPhotos(filteredPhotos);
  };

  // Фильтр по комментариям
  var filteredComments = function (data, displayPhotos) {
    var newPhotos = data.slice();

    var commentsPhotos = newPhotos.sort(function (first, second) {
      if (first.comments.length > second.comments.length) {
        return -1;
      } else if (first.comments.length < second.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });

    displayPhotos(commentsPhotos);
  };

  window.filters = {
    filteredNew: filteredNew,
    filteredComments: filteredComments
  };
})();
