'use strict';

(function () {

  window.pinsList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (object) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = object.location.x - window.consts.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = object.location.y - window.consts.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = object.author.avatar;
    pinElement.querySelector('img').alt = object.offer.title;

    return pinElement;
  };

  window.fragment = document.createDocumentFragment();

  var fillFragment = function () {
    for (var i = 0; i < window.adsList.length; i++) {
      var pin = renderPin(window.adsList[i]);
      pin.dataset.index = [i];
      window.fragment.appendChild(pin);
    }
  };

  fillFragment();

})();
