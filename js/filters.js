'use strict';
(function () {
  // Фильтр по новым фотографиям
  var filteredNew = function (data) {
    var counterNewPhotos = 10;
    var newPhotos = data.slice();
    var filteredPhotos = [];

    // Получаем случайный массив фотографий
    while (filteredPhotos.length < counterNewPhotos) {
      var i = Math.floor(Math.random() * (newPhotos.length - 1));
      filteredPhotos.push(newPhotos[i]);
      newPhotos.splice(i, 1);
    }

    return filteredPhotos;
  };

  // Фильтр по комментариям
  var filteredComments = function (data) {
    var newPhotos = data.slice();

    var commentsPhotos = newPhotos.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });

    return commentsPhotos;
  };

  // Фильтр по популярности
  var filteredPopular = function (data) {
    return data;
  };

  window.filters = {
    filteredNew: filteredNew,
    filteredComments: filteredComments,
    filteredPopular: filteredPopular
  };
})();
