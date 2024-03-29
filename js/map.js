'use strict';
(function () {

  /* добавляем атрибут disabled */

  var adFormElements = document.querySelectorAll('.ad-form input, .ad-form select, .ad-form textarea');
  var filterFormElements = document.querySelectorAll('.map__filters input, .map__filters select');

  var setDisabledAttr = function (fieldsCollection) {
    fieldsCollection.forEach(function (element) {
      var field = element;
      field.setAttribute('disabled', 'disabled');
    });
  };

  var removeDisableAtrr = function (fieldsCollection) {
    fieldsCollection.forEach(function (element) {
      var field = element;
      field.removeAttribute('disabled');
    });
  };

  setDisabledAttr(adFormElements);
  setDisabledAttr(filterFormElements);

  /* активируем страницу */

  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var pinsList = document.querySelector('.map__pins');

  var fillInactiveAddressField = function () {
    addressField.value = (window.consts.STARTING_PIN_X + window.consts.MAIN_PIN_WIDTH / 2) + ', ' + (window.consts.STARTING_PIN_Y + window.consts.MAIN_PIN_HEIGTH / 2);
  };

  fillInactiveAddressField();

  var fillActiveAddressField = function (x, y) {
    addressField.value = (x + window.consts.MAIN_PIN_WIDTH / 2) + ', ' + (y + window.consts.MAIN_PIN_HEIGTH + window.consts.PIN_TIP_HEIGHT);
  };


  /* фильтр */

  var adverts = [];

  var advertsToShow = [];

  var mapForm = document.querySelector('.map__filters');

  var removePins = function () {
    var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var renderCorrectQuantityOfAds = function (adsToShow) {
    var fragment = document.createDocumentFragment();
    var ads = adsToShow.slice(0, window.consts.CORRECT_QUANTITY);

    for (var i = 0; i < ads.length; i++) {
      if (ads[i].offer) {
        var pin = window.renderPin(ads[i]);
        pin.dataset.index = [i];
        fragment.appendChild(pin);
      }
    }

    pinsList.appendChild(fragment);
    advertsToShow = adsToShow;
  };


  var getPrice = function (price) {
    if (price < window.consts.MIN_PRICE) {
      return window.consts.LOW_PRICE;
    } else

    if (price > window.consts.MAX_PRICE) {
      return window.consts.HIGH_PRICE;

    }
    return window.consts.MIDDLE_PRICE;
  };

  var onFormElementChange = window.debounce(function () {

    var nodes = Array.from(mapForm.querySelectorAll('option:checked:not([value="any"]), input:checked'));

    var filterParams = nodes.map(function (node) {
      return {
        name: node.checked
          ? node.value
          : node.parentNode.name,
        value: node.checked || node.value
      };
    });

    var filterApartment = function (ad) {

      var getFeature = function (adFeatures, feature) {
        adFeatures[feature] = true;
        return adFeatures;
      };

      var apartmentFeatures = ad.offer.features.reduce(getFeature, {});

      var apartmentParams = {
        'housing-type': ad.offer.type,
        'housing-price': getPrice(ad.offer.price),
        'housing-rooms': ad.offer.rooms.toString(),
        'housing-guests': ad.offer.guests.toString()
      };

      var assignedParams = Object.assign({}, apartmentParams, apartmentFeatures);

      return filterParams.every(function (param) {

        return assignedParams[param.name] === param.value;

      });
    };

    advertsToShow = adverts.filter(filterApartment);

    removePins();

    if (card) {
      window.card.close(card);
    }

    renderCorrectQuantityOfAds(advertsToShow);

  });

  mapForm.addEventListener('change', onFormElementChange);

  var onSuccessDataLoad = function (ads) {
    adverts = ads;
    renderCorrectQuantityOfAds(adverts);
    removeDisableAtrr(filterFormElements);
  };

  var activatePage = function () {
    mapContainer.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeDisableAtrr(adFormElements);
    window.backend.load(onSuccessDataLoad, window.onError);
    fillActiveAddressField(window.consts.STARTING_PIN_X, window.consts.STARTING_PIN_Y);
    active = true;
  };

  var active = false;

  var deactivatePage = function () {
    resetForms();

    if (card) {
      window.card.close(card);
      card = null;
    }

    removePins();

    mainPin.style.left = window.consts.STARTING_PIN_X + 'px';
    mainPin.style.top = window.consts.STARTING_PIN_Y + 'px';
    mapContainer.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setDisabledAttr(adFormElements);
    setDisabledAttr(filterFormElements);
    addressField.value = (window.consts.STARTING_PIN_X + window.consts.MAIN_PIN_WIDTH / 2) + ', ' + (window.consts.STARTING_PIN_Y + window.consts.MAIN_PIN_HEIGTH / 2);
    active = false;

    var selectedType = window.form.typeSelect.value;
    window.form.priceField.placeholder = window.consts.accommodationTypes[selectedType].placeholder;

    window.form.capacitySelect.innerHTML = window.consts.DEFAULT_CAPACITY_VALUE;

    window.photoLoading.avatarPreview.src = window.consts.DEFAULT_AVATAR;

    var loadedPhotos = window.photoLoading.loadedPhotosContainer.querySelectorAll('.ad-form__photo');

    if (loadedPhotos) {
      loadedPhotos.forEach(function (element) {
        element.remove();
      });
    }

  };

  /* отправка формы */

  var resetForms = function () {
    adForm.reset();
    mapForm.reset();
  };

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainBlock = document.querySelector('main');

  var onSuccessFormSend = function () {
    deactivatePage();

    /* success message */

    var success = successTemplate.cloneNode(true);
    mainBlock.appendChild(success);

    var successMessageClose = function () {
      success.remove();
      document.removeEventListener('keydown', onSuccessEscKeydown);
      document.removeEventListener('click', onSuccessMapClick);
    };

    var onSuccessEscKeydown = function (evt) {
      if (evt.keyCode === window.consts.ESC_KEYCODE) {
        successMessageClose();
      }
    };

    var onSuccessMapClick = function () {
      successMessageClose();
    };

    document.addEventListener('keydown', onSuccessEscKeydown);
    document.addEventListener('click', onSuccessMapClick);
  };


  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(adForm), onSuccessFormSend, window.onError);
  });

  var resetButton = adForm.querySelector('.ad-form__reset');

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    deactivatePage();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  mainPin.addEventListener('mousedown', function (evt) {

    var dragged = false;

    var newCoords = {
      x: window.consts.STARTING_PIN_X,
      y: window.consts.STARTING_PIN_Y
    };

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
      dragged = true;

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

      fillActiveAddressField(newCoords.x, newCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        fillActiveAddressField(newCoords.x, newCoords.y);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

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
      window.card.close(card);
    }
  };

  var onMapClick = function (evt) {
    window.map.clickedPin = evt.target.closest('button.map__pin:not(.map__pin--main)');


    if (!window.map.clickedPin) {
      return;
    }

    var pinIndex = window.map.clickedPin.dataset.index;

    if (card) {
      window.card.close(card);
    }
    card = window.card.render(advertsToShow[pinIndex]);
    mapContainer.insertBefore(card, mapFilters);
    document.addEventListener('keydown', window.onEscKeydown);
  };

  mapContainer.addEventListener('click', onMapClick);


  window.map = {
    clickedPin: null
  };

})();
