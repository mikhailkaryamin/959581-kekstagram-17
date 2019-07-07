'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imageChooserElement = document.querySelector('.img-upload__input');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');
  var imgPreviewElement = uploadPreviewElement.querySelector('img');

  imageChooserElement.addEventListener('change', function () {
    var file = imageChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
