'use strict';
(function () {
  /* добавляем атрибут disabled */

  var adInputs = document.querySelectorAll('.ad-form input');
  var adSelects = document.querySelectorAll('.ad-form select');
  var filterInputs = document.querySelectorAll('.map__filters input');
  var filterSelects = document.querySelectorAll('.map__filters select');

  var newCoords = {
    x: window.consts.STARTING_PIN_X,
    y: window.consts.STARTING_PIN_Y
  };

  var setDisabledAttr = function (fieldsCollection) {
    for (var i = 0; i < fieldsCollection.length; i++) {
      var field = fieldsCollection[i];
      field.setAttribute('disabled', 'disabled');
    }
  };

  var removeDisableAtrr = function (fieldsCollection) {
    for (var i = 0; i < fieldsCollection.length; i++) {
      var field = fieldsCollection[i];
      field.removeAttribute('disabled');
    }
  };

  setDisabledAttr(adInputs);
  setDisabledAttr(adSelects);
  setDisabledAttr(filterInputs);
  setDisabledAttr(filterSelects);

  /* активируем страницу */

  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var pinsList = document.querySelector('.map__pins');

  addressField.value = (window.consts.STARTING_PIN_X + window.consts.MAIN_PIN_WIDTH / 2) + ', ' + (window.consts.STARTING_PIN_Y + window.consts.MAIN_PIN_HEIGTH / 2);

  var fillAddressField = function (x, y) {
    addressField.value = (x + window.consts.MAIN_PIN_WIDTH / 2) + ', ' + (y + window.consts.MAIN_PIN_HEIGTH + window.consts.PIN_TIP_HEIGHT);
  };


  var successHandler = function (adsArray) {

    window.adsList = adsArray;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adsArray.length; i++) {

      if (adsArray[i].offer) {

        var pin = window.renderPin(adsArray[i]);
        pin.dataset.index = [i];
        fragment.appendChild(pin);
      }
    }
    pinsList.appendChild(fragment);

  };


  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;
    document.querySelector('main').appendChild(error);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      error.remove();
      window.load(successHandler, errorHandler);
    });
  };

  var activatePage = function () {
    mapContainer.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeDisableAtrr(adInputs);
    removeDisableAtrr(adSelects);
    removeDisableAtrr(filterInputs);
    removeDisableAtrr(filterSelects);
    window.load(successHandler, errorHandler);
    fillAddressField(window.consts.STARTING_PIN_X, window.consts.STARTING_PIN_Y);
    active = true;
  };

  var active = false;

  mainPin.addEventListener('mousedown', function (evt) {

    if (!active) {
      activatePage();
    }

    /* перемещение */
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetLeft - shift.x <= window.consts.MIN_X_VALUE - window.consts.MAIN_PIN_WIDTH / 2) {
        var offsetX = window.consts.MIN_X_VALUE - window.consts.MAIN_PIN_WIDTH / 2;
      } else
      if (mainPin.offsetLeft - shift.x >= window.consts.MAX_X_VALUE - window.consts.MAIN_PIN_WIDTH / 2) {
        offsetX = window.consts.MAX_X_VALUE - window.consts.MAIN_PIN_WIDTH / 2;
      } else {
        offsetX = mainPin.offsetLeft - shift.x;
      }

      if (mainPin.offsetTop - shift.y <= (window.consts.MIN_Y_VALUE - window.consts.MAIN_PIN_HEIGTH - window.consts.PIN_TIP_HEIGHT)) {
        var offsetY = window.consts.MIN_Y_VALUE - window.consts.MAIN_PIN_HEIGTH - window.consts.PIN_TIP_HEIGHT;
      } else if (mainPin.offsetTop - shift.y >= (window.consts.MAX_Y_VALUE - window.consts.MAIN_PIN_HEIGTH - window.consts.PIN_TIP_HEIGHT)) {
        offsetY = window.consts.MAX_Y_VALUE - window.consts.MAIN_PIN_HEIGTH - window.consts.PIN_TIP_HEIGHT;
      } else {
        offsetY = mainPin.offsetTop - shift.y;
      }

      newCoords = {
        x: offsetX,
        y: offsetY
      };

      mainPin.style.top = newCoords.y + 'px';
      mainPin.style.left = newCoords.x + 'px';

      fillAddressField(newCoords.x, newCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      fillAddressField(newCoords.x, newCoords.y);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.consts.ENTER_KEYCODE) {
      activatePage();
    }
  });


  /* показ/скрытие карточек объявлений */
  var mapContainer = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var card = null;

  window.onEscKeydown = function (evt) {
    if (evt.keyCode === window.consts.ESC_KEYCODE) {
      window.card.close();
    }
  };

  var onMapClick = function (evt) {
    var clickedPin = evt.target.closest('button.map__pin:not(.map__pin--main)');

    if (!clickedPin) {
      return;
    }

    var pinIndex = clickedPin.dataset.index;

    if (card) {
      window.card.close();
    }
    card = window.card.render(window.adsList[pinIndex]);
    mapContainer.insertBefore(card, mapFilters);
    document.addEventListener('keydown', window.onEscKeydown);
  };

  mapContainer.addEventListener('click', onMapClick);

})();
