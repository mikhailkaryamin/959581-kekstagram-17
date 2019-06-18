'use strict';
// Получаем моки

var getMockData = function () {
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
  var MIN_URL = 1;
  var MAX_URL = 25;

  // Получаем случайное число лайков

  var generateLikes = function () {
    var MIN_LIKES = 15;
    var MAX_LIKES = 200;

    return Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES) + MIN_LIKES);
  };

  // Получаем случайный элемент массива

  var getRandomElement = function (array) {
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
    var avatar = getRandomElement(avatars);
    var message = getRandomElement(messages);
    var name = getRandomElement(names);
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

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < descriptionPhotos.length; i++) {
    fragment.appendChild(renderDescription(descriptionPhotos[i]));
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
  var mockData = getMockData();
  var descriptionPhotosList = generateDescriptionList(mockData);
  insertDescriptionList(descriptionPhotosList);
};

// Загрузка изображения и редактирование изображения
var uploadAndEditionImage = function () {

  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = document.getElementById('upload-file');
  var formEdition = imgUpload.querySelector('.img-upload__overlay');
  var editionClose = imgUpload.querySelector('.img-upload__cancel');
  var effectsList = document.querySelector('.effects__list');

  var onEditionEscPress = function (evt) {
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      closeFormEdition();
    }
  };

  var resetFormEdition = function () {
    var scaleControl = document.querySelector('.scale__control--value');
    var levelLine = document.querySelector('.effect-level__line');
    var levelPin = levelLine.querySelector('.effect-level__pin');
    var levelDepth = levelLine.querySelector('.effect-level__depth');

    levelPin.style.left = '100%';
    levelDepth.style.width = '100%';
    scaleControl.value = '100%';
  };

  var openFormEdition = function () {
    formEdition.classList.remove('hidden');
    resetFormEdition();
    document.addEventListener('keydown', onEditionEscPress);
  };

  var closeFormEdition = function () {
    formEdition.classList.add('hidden');
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    openFormEdition();
  });

  editionClose.addEventListener('click', function () {
    closeFormEdition();
  });

  // Накладываем эффекты на фото

  effectsList.addEventListener('change', function (evt) {
    var filterName = evt.target.value;

    getEffectPreview(filterName);
  });

  var getEffectPreview = function (effect) {
    var previewPhoto = imgUpload.querySelector('.img-upload__preview');
    var currentFilterClassName = '';
    var imgPreview = previewPhoto.querySelector('img');
    var slider = document.querySelector('.img-upload__effect-level');

    if (currentFilterClassName) {
      imgPreview.classList.remove(currentFilterClassName);
    }

    if (effect !== 'none') {
      slider.classList.remove('hidden');
      currentFilterClassName = 'effects__preview--' + effect;
      imgPreview.classList.add(currentFilterClassName);
    } else {
      slider.classList.add('hidden');
      currentFilterClassName = '';
    }
  };
};

displayPhotos();
uploadAndEditionImage();
// var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
// var generateEffect = function () {
//   var style = window.getComputedStyle(effectLevelPin);
//   var left = parseInt((style.getPropertyValue('left')), 10);
//   var obejctsEffects = {
//     chrome: {
//       minValue: 0,
//       maxValue: 1
//     },

//     sepia: {
//       minValue: 0,
//       maxValue: 1
//     },

//     marvin: {
//       minValue: 0,
//       maxValue: 100
//     },

//     phobos: {
//       minValue: 0,
//       maxValue: 3
//     },

//     heat: {
//       minValue: 1,
//       maxValue: 3
//     }
//   };
//   if (checkedElement !== 'none') {
//     var maxValue = obejctsEffects[checkedElement].maxValue;
//     var minValue = obejctsEffects[checkedElement].minValue;
//     var range = maxValue - minValue;
//     var effectValue = range * left / 100 + minValue;
//   }
//   return effectValue;
// };

// var searchChecked = function () {
//   var effectsList = document.querySelector('.effects__list');
//   var elementEffect = effectsList.querySelector('input[type=radio]:checked');
//   var elementValue = elementEffect.value;
//   return elementValue;
// };

// var checkedElement = searchChecked();
// var valueEffect = generateEffect();

// var getEffectString = function (effect, value) {
//   var effectString;
//   switch (effect) {
//     case 'chrome':
//       effectString = 'grayscale(' + value + ')';
//       break;
//     case 'sepia':
//       effectString = 'sepia(' + value + ')';
//       break;
//     case 'marvin':
//       effectString = 'invert(' + value + ')';
//       break;
//     case 'phobos':
//       effectString = 'blur(' + value + 'px)';
//       break;
//     case 'heat':
//       effectString = 'brightness(' + value + ')';
//       break;
//     default:
//       effectString = '';
//       break;
//   }
//   return effectString;
// };


