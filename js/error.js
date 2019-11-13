'use strict';
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.onError = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);

    error.querySelector('.error__message').textContent = errorMessage;

    var errorMessageClose = function () {
      error.remove();
      error.removeEventListener('click', onErrorOverlayClick);
      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onErrorEscKeydown);
    };

    var onErrorButtonClick = function () {
      errorMessageClose();
    };

    var onErrorOverlayClick = function () {
      errorMessageClose();
    };

    var onErrorEscKeydown = function (evt) {
      if (evt.keyCode === window.consts.ESC_KEYCODE) {
        errorMessageClose();
      }
    };

    var errorButton = error.querySelector('.error__button');


    errorButton.addEventListener('click', onErrorButtonClick);
    error.addEventListener('click', onErrorOverlayClick);
    document.addEventListener('keydown', onErrorEscKeydown);

    document.querySelector('main').appendChild(error);
  };
})();
