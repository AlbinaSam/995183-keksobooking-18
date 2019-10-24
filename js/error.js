'use strict';
(function () {
  window.onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;

    var errorMessageClose = function () {
      error.remove();
      document.removeEventListener('click', onErrorMapClick);
      errorButton.removeEventListener('click', onErrorMapClick);
      document.removeEventListener('keydown', onErrorEscKeydown);
    };

    var onErrorMapClick = function () {
      errorMessageClose();
    };

    var onErrorEscKeydown = function (evt) {
      if (evt.keyCode === window.consts.ESC_KEYCODE) {
        errorMessageClose();
      }
    };

    var errorButton = error.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorMapClick);
    document.addEventListener('click', onErrorMapClick);
    document.addEventListener('keydown', onErrorEscKeydown);

    document.querySelector('main').appendChild(error);
  };
})();
