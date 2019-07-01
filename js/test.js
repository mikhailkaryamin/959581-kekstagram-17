  // Сбрасываем класс актив при переключении
  var resetActiveClass = function () {
    var filterFormElement = document.querySelector('.img-filters__form');
    var buttonElements = filterFormElement.querySelectorAll('button');
    var buttonClassName = 'img-filters__button';
    var buttonActiveClassName = 'img-filters__button  img-filters__button--active';

    buttonElements.forEach(function (button) {
      button.className = buttonClassName;
      button.addEventListener('click', function (evt) {
        if (button.className !== buttonActiveClassName) {
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
    addPictureList(photos);
  };

  var renderFilteredNew = function () {
    window.filters.filteredNew(photos, addPictureList);
  };

  var renderFilteredComments = function () {
    window.filters.filteredComments(photos, addPictureList);
  };

  filterPopularElement.addEventListener('click', function () {
    resetActiveClass();
    resetPicturesDOM();
    renderFilteredPopular();
  });

  filterNewElement.addEventListener('click', function () {
    resetActiveClass();
    resetPicturesDOM();
    renderFilteredNew();
  });

  filterCommentsElement.addEventListener('click', function () {
    resetActiveClass();
    resetPicturesDOM();
    renderFilteredComments();
  });
