'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adPhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  var getMatches = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = window.consts.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    return matches;
  };

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    if (file) {
      var matches = getMatches(file);

      if (matches) {

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });


  adPhotoFileChooser.addEventListener('change', function () {
    var file = adPhotoFileChooser.files[0];

    if (file) {
      var matches = getMatches(file);

      if (matches) {

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var adPhotoPreview = document.createElement('img');
          adPhotoPreview.src = reader.result;
          adPhotoPreview.alt = 'Фотография жилья';
          adPhotoPreview.width = 70;
          adPhotoPreview.height = 70;
          adFormPhoto.appendChild(adPhotoPreview);
        });

        reader.readAsDataURL(file);
      }
    }
  });

})();

