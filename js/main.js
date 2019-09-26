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
  var randomValue = elements[getRandomNumber(0, elements.length - 1)];
  return randomValue;
};

var getRandomLengthArray = function (array) {
  var lastElement = getRandomNumber(1, array.length);
  return array.slice(0, lastElement);
};

var adsList = [];
var createAdsArray = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var location = {
      x: getRandomNumber(MIN_X_VALUE, MAX_X_VALUE),
      y: getRandomNumber(MIN_Y_VALUE, MAX_Y_VALUE)
    };

    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Tokyo Hilton Hotel',
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
      location: location
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

var mapContainer = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var renderCard = function (adObject) {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = adObject.offer.title;

  card.querySelector('.popup__text--address').textContent = adObject.offer.address;

  card.querySelector('.popup__text--price').textContent = adObject.offer.price + ' ₽/ночь';

  /* выводим тип жилья */
  if (adObject.offer.type === 'flat') {
    card.querySelector('.popup__type').textContent = 'Квартира';
  } else
  if (adObject.offer.type === 'bungalo') {
    card.querySelector('.popup__type').textContent = 'Бунгало';
  } else
  if (adObject.offer.type === 'house') {
    card.querySelector('.popup__type').textContent = 'Дом';
  } else {
    card.querySelector('.popup__type').textContent = 'Дворец';
  }


  card.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей.';

  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout + '.';


  /* выводим удобства */
  var featuresArray = adObject.offer.features;
  var featuresList = card.querySelector('.popup__features');
  var featuresElements = card.querySelectorAll('.popup__feature');

  for (var i = 0; i < featuresArray.length; i++) {
    if (featuresArray[i] !== featuresElements[i]) {
      featuresList.removeChild(featuresElements[i]);
    }
  }


  card.querySelector('.popup__description').textContent = adObject.offer.description;

  /* выводим фотографии */
  card.querySelector('.popup__photo').src = adObject.offer.photos[0];

  var photosArray = adObject.offer.photos;
  var imgList = card.querySelector('.popup__photos');

  for (var j = 1; i < photosArray.length; j++) {
    var img = document.createElement('img');
    img.src = photosArray[j];
    img.classList.add('popup__photo');
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    imgList.appendChild(img);
  }


  card.querySelector('.popup__avatar').src = adObject.author.avatar;

  return card;
};

var cardFragment = document.createDocumentFragment();

var fillCardFragment = function () {
  cardFragment.appendChild(renderCard(adsList[0]));
};

fillCardFragment();

var mapFilters = document.querySelector('.map__filters-container');
mapContainer.insertBefore(cardFragment, mapFilters);
