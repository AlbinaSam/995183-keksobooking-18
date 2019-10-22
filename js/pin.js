'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.renderPin = function (object) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = object.location.x - window.consts.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = object.location.y - window.consts.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = object.author.avatar;
    pinElement.querySelector('img').alt = object.offer.title;

    return pinElement;
  };

})();
