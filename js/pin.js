'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (object) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = object.location.x - window.consts.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = object.location.y - window.consts.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = object.author.avatar;
    pinElement.querySelector('img').alt = object.offer.title;

    return pinElement;
  };


  window.fillFragment = function (adsArray) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adsArray.length; i++) {
      var pin = renderPin(adsArray[i]);
      pin.dataset.index = [i];
      fragment.appendChild(pin);
    }

    return fragment;
  };

})();
