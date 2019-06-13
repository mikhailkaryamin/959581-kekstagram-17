'use strict';
var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AVATARS = [
  'img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'
];

// Получаем моки

var getMockData = function () {

  var MIN_URL = 1;
  var MAX_URL = 25;

  // Получаем случайное число лайков

  var generateLikes = function () {
    var MIN_LIKES = 15;
    var MAX_LIKES = 200;

    return Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES) + MIN_LIKES);
  };

  // Получаем случайный элемент массива

  var getRandomArrayIndex = function (array) {
    var i = Math.floor(Math.random() * (array.length - 1));
    return array[i];
  };

  // Получаем адрес картинки

  var generateLinksImgs = function () {
    var linkImg = [];
    for (var i = MIN_URL; i <= MAX_URL; i++) {
      linkImg.push('photos/' + i + '.jpg');
    }

    function compareRandom() {
      return Math.random() - 0.5;
    }

    return linkImg.sort(compareRandom);
  };

  // Получаем данные комментария

  var generateCommentData = function (names, messages, avatars) {
    var avatar = getRandomArrayIndex(avatars);
    var message = getRandomArrayIndex(messages);
    var name = getRandomArrayIndex(names);
    return {
      avatar: avatar,
      message: message,
      name: name
    };
  };

  // Получаем список комментариев к фото

  var generateComments = function () {
    var commentsPhotos = [];
    for (var i = 0; i < MAX_URL; i++) {
      var comments = [];
      var numberComments = (Math.floor(Math.random() * (MAX_URL - MIN_URL) + MIN_URL));
      for (var j = 0; j < numberComments; j++) {
        comments.push(generateCommentData(NAMES, MESSAGES, AVATARS));
      }
      commentsPhotos.push(comments);
    }

    return commentsPhotos;
  };

  // Получаем список описаний фотографий

  var generateDescriptionPhotos = function () {
    var descriptionPhotos = [];

    for (var i = 0; i < MAX_URL; i++) {
      descriptionPhotos.push({
        url: urlsPhotos[i],
        likes: generateLikes(),
        comments: commentsPhotosList[i]
      });
    }

    return descriptionPhotos;
  };


  // Собираем массив фото

  var urlsPhotos = generateLinksImgs();

  // Собираем массив комментариев

  var commentsPhotosList = generateComments();
  var mockDataPhoto = generateDescriptionPhotos(urlsPhotos, commentsPhotosList);

  return mockDataPhoto;
};

// Создаем DOM фрагмент 'Описание фотографии'

var renderDescription = function (mockDataPhotos) {

  var descriptionTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var elementDescription = descriptionTemplate.cloneNode(true);

  elementDescription.querySelector('.picture__img').src = mockDataPhotos.url;
  elementDescription.querySelector('.picture__likes').textContent = mockDataPhotos.likes;
  elementDescription.querySelector('.picture__comments').textContent = mockDataPhotos.comments.length;

  return elementDescription;
};

// Вставляет фрагменты в DOM

var generateDescriptionList = function (descriptionPhotos) {

  var similarListElement = document.querySelector('.pictures');

  for (var i = 0; i < descriptionPhotos.length; i++) {
    var descriptionPhoto = renderDescription(descriptionPhotos[i]);
    similarListElement.appendChild(descriptionPhoto);
  }

  return similarListElement;
};

var mockData = getMockData();
var descriptionPhotosList = generateDescriptionList(mockData);
var insertDescriptionList = function () {
  return descriptionPhotosList;
};

insertDescriptionList(descriptionPhotosList);
