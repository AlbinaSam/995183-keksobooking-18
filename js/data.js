'use strict';
(function () {

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  };

  var getRandomElement = function (elements) {
    var randomValue = elements[getRandomNumber(0, elements.length - 1)];
    return randomValue;
  };

  var getRandomLengthArray = function (array) {
    var lastElement = getRandomNumber(1, array.length);
    return array.slice(0, lastElement);
  };


  window.createAdsArray = function () {
    var adsList = [];

    for (var i = 0; i < window.consts.ADS_NUMBER; i++) {
      var location = {
        x: getRandomNumber(window.consts.MIN_X_VALUE, window.consts.MAX_X_VALUE),
        y: getRandomNumber(window.consts.MIN_Y_VALUE, window.consts.MAX_Y_VALUE)
      };

      var ad = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Tokyo Hilton Hotel',
          address: location.x + ',' + ' ' + location.y,
          price: getRandomNumber(0, 10000),
          type: getRandomElement(window.consts.OFFER_TYPES),
          rooms: getRandomNumber(1, 3),
          guests: getRandomNumber(1, 3),
          checkin: getRandomElement(window.consts.OFFER_TIMES),
          checkout: getRandomElement(window.consts.OFFER_TIMES),
          features: getRandomLengthArray(window.consts.OFFER_FEATURES),
          description: 'Лучшее предложение',
          photos: getRandomLengthArray(window.consts.OFFER_PHOTOS),
        },
        location: location
      };

      adsList.push(ad);
    }

    return adsList;
  };

})();
