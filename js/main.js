'use strict';
var ADS_NUMBER = 8;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = [1, 2, 3];
var OFFER_GUESTS = [1, 2, 3];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomElement = function (elements) {
  var randomValue = elements[Math.floor(Math.random(elements) * elements.length)];
  return randomValue;
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

var getRandomArray = function (array) {
  var randomArray = [];
  var arrayLength = getRandomNumber(1, array.length);
  for (var i = 0; i < arrayLength; i++) {
    var arrayItem = array[i];
    randomArray.push(arrayItem);
  }
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
        address: '600, 350',
        price: getRandomNumber(0, 10000),
        type: getRandomElement(OFFER_TYPE),
        rooms: getRandomElement(OFFER_ROOMS),
        guests: getRandomElement(OFFER_GUESTS),
        checkin: getRandomElement(OFFER_TIMES),
        checkout: getRandomElement(OFFER_TIMES),
        features: getRandomArray(OFFER_FEATURES),
        description: 'Лучшее предложение',
        photos: getRandomArray(OFFER_PHOTOS),
      },
      location: {
        x: getRandomNumber(0, 1200),
        y: getRandomNumber(130, 630)
      }
    };

    adsList.push(ad);
  }
  return adsList;
};
createAdsArray();

document.querySelector('.map').classList.remove('map--faded');

var PinsList = document.querySelector('.map__pins');
var PinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (object) {
  var pinElement = PinTemplate.cloneNode(true);
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
  return fragment;
};

fillFragment();

PinsList.appendChild(fragment);
