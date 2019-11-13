'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adPhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var loadedPhotosContainer = document.querySelector('.ad-form__photo-container');

  window.photoLoading = {
    avatarPreview: avatarPreview,
    loadedPhotosContainer: loadedPhotosContainer
  };

  var getMatches = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = window.consts.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    return matches;
  };

  var setAvatarPreviewSrc = function (evt) {
    avatarPreview.src = evt.target.result;
  };

  var createPhotoPreview = function (evt) {
    var photoWrapper = document.createElement('div');
    photoWrapper.classList.add('ad-form__photo');
    var adPhotoPreview = document.createElement('img');
    adPhotoPreview.src = evt.target.result;
    adPhotoPreview.alt = 'Фотография жилья';
    adPhotoPreview.width = 70;
    adPhotoPreview.height = 70;
    photoWrapper.appendChild(adPhotoPreview);
    loadedPhotosContainer.appendChild(photoWrapper);
  };

  var readFile = function (file, cb) {

    if (file) {
      var matches = getMatches(file);

      if (matches) {

        var reader = new FileReader();

        reader.addEventListener('load', cb);

        reader.readAsDataURL(file);
      }
    }
  };

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    readFile(file, setAvatarPreviewSrc);
  });


  adPhotoFileChooser.addEventListener('change', function () {
    var file = adPhotoFileChooser.files[0];
    readFile(file, createPhotoPreview);
  });

})();

