'use strict';
var ADS_NUMBER = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_X_VALUE = 0;
var MAX_X_VALUE = 1200;
var MIN_Y_VALUE = 130;
var MAX_Y_VALUE = 630;

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var getRandomElement = function (elements) {
  var randomValue = elements[getRandomNumber(0, elements.length)];
  return randomValue;
};

var getRandomLengthArray = function (array) {
  var lastElement = getRandomNumber(1, array.length);
  var randomArray = array.slice(0, lastElement);
  return randomArray;
};

var adsList = [];
var createAdsArray = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Квартира',
        address: location.x + ',' + ' ' + location.y,
        price: getRandomNumber(0, 10000),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 3),
        checkin: getRandomElement(OFFER_TIMES),
        checkout: getRandomElement(OFFER_TIMES),
        features: getRandomLengthArray(OFFER_FEATURES),
        description: 'Лучшее предложение',
        photos: getRandomLengthArray(OFFER_PHOTOS),
      },
      location: {
        x: getRandomNumber(MIN_X_VALUE, MAX_X_VALUE),
        y: getRandomNumber(MIN_Y_VALUE, MAX_Y_VALUE)
      }
    };
    adsList.push(ad);
  }
};
createAdsArray();

document.querySelector('.map').classList.remove('map--faded');

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = object.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = object.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = object.author.avatar;
  pinElement.querySelector('img').alt = object.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

var fillFragment = function () {
  for (var i = 0; i < adsList.length; i++) {
    fragment.appendChild(renderPin(adsList[i]));
  }
};

fillFragment();

pinsList.appendChild(fragment);
