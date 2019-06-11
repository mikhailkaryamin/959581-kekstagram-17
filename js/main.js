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

var descriptionTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var minLikes = 15;
var maxLikes = 200;
var minURL = 1;
var maxURL = 25;

// Получаем случайное число лайков

var generateLikes = function () {
  var likes = [];

  for (var i = 0; i < maxURL; i++) {
    likes.push(Math.floor(Math.random() * maxLikes + minLikes));
  }

  return likes;
};

// Получаем случайный элемент массива

var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * (array.length - 1));
};

// Получаем адрес картинки

var generateLinksImgs = function () {
  var linkImg = [];
  for (var i = minURL; i <= maxURL; i++) {
    linkImg.push('photos/' + i + '.jpg');
  }

  function compareRandom() {
    return Math.random() - 0.5;
  }

  return linkImg.sort(compareRandom);
};

// Получаем данные комментария

var generateCommentData = function (names, messages, avatars) {
  var avatar = avatars[getRandomArrayIndex(avatars)];
  var message = messages[getRandomArrayIndex(messages)];
  var name = names[getRandomArrayIndex(names)];

  return {
    avatar: avatar,
    message: message,
    name: name
  };
};

// Получаем список комментариев к фото

var generateComments = function () {
  var commentsPhotosList = [];
  for (var i = 0; i < maxURL; i++) {
    var commetsPhoto = [];
    var numberComments = (Math.floor(Math.random() * maxURL + minURL));
    for (var j = 0; j < numberComments; j++) {
      commetsPhoto.push(generateCommentData(NAMES, MESSAGES, AVATARS));
    }
    commentsPhotosList.push(commetsPhoto);
  }

  return commentsPhotosList;
};

// Собираем массив лайков

var likesPhotos = generateLikes();

// Собираем массив фото

var urlsPhotos = generateLinksImgs();

// Собираем массив комментариев

var commentsPhotosList = generateComments();

// Получаем список описаний фотографий

var generateDescriptionPhotos = function () {
  var descriptionPhotos = [];

  for (var i = 0; i < maxURL; i++) {
    descriptionPhotos.push({
      url: urlsPhotos[i],
      likes: likesPhotos[i],
      comments: commentsPhotosList[i]
    });
  }

  return descriptionPhotos;
};

// Создаем DOM элементы 'Описание фотографий'

var renderDescription = function (descriptionPhotos) {
  var elementDescription = descriptionTemplate.cloneNode(true);
  elementDescription.querySelector('.picture__img').src = descriptionPhotos.url;
  elementDescription.querySelector('.picture__likes').textContent = descriptionPhotos.likes;
  elementDescription.querySelector('.picture__comments').textContent = descriptionPhotos.comments.length;

  return elementDescription;
};

// Вставляет фрагменты в DOM

var generateDescriptionList = function (descriptionPhotos) {
  var fragment = document.createDocumentFragment();
  var similarListElement = document.querySelector('.pictures');

  for (var i = 0; i < descriptionPhotos.length; i++) {
    fragment.appendChild(renderDescription(descriptionPhotos[i]));
  }

  similarListElement.appendChild(fragment);
  return fragment;

};

var descriptionPhotos = generateDescriptionPhotos(likesPhotos, urlsPhotos, commentsPhotosList);
var descriptionPhotosList = generateDescriptionList(descriptionPhotos);

var insertDescriptionList = function () {
  return descriptionPhotosList;
};

insertDescriptionList(descriptionPhotosList);
