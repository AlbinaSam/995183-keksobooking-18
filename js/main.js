'use strict';
var ADS_NUMBER = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// var PIN_WIDTH = 50;
// var PIN_HEIGHT = 70;
var MIN_X_VALUE = 0;
var MAX_X_VALUE = 1200;
var MIN_Y_VALUE = 130;
var MAX_Y_VALUE = 630;
var ENTER_KEYCODE = 13;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGTH = 62;
var PIN_TIP_HEGHT = 22;
var STARTING_PIN_X = 570;
var STARTING_PIN_Y = 375;

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
/*
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

  // выводим тип жилья
  var type = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  card.querySelector('.popup__type').textContent = type[adObject.offer.type];

  card.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей.';

  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout + '.';


  // выводим удобства
  var features = adObject.offer.features;
  var featuresList = card.querySelector('.popup__features');

  if (features.length === 0) {
    featuresList.remove();
  } else {
    featuresList.innerHTML = '';
    for (var i = 0; i < features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + features[i]);
      featuresList.appendChild(featureElement);
    }
  }


  card.querySelector('.popup__description').textContent = adObject.offer.description;

  // выводим фотографии
  var photos = adObject.offer.photos;
  var imgList = card.querySelector('.popup__photos');

  if (photos.length === 0) {
    imgList.remove();
  } else {
    imgList.innerHTML = '';
    for (var j = 0; j < photos.length; j++) {
      var img = document.createElement('img');
      img.src = photos[j];
      img.classList.add('popup__photo');
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      imgList.appendChild(img);
    }
  }

  card.querySelector('.popup__avatar').src = adObject.author.avatar;

  return card;
};

var mapFilters = document.querySelector('.map__filters-container');
mapContainer.insertBefore(renderCard(adsList[0]), mapFilters); */


/* добавляем атрибут disabled */

var adInputs = document.querySelectorAll('.ad-form input');
var adSelects = document.querySelectorAll('.ad-form select');
var filterInputs = document.querySelectorAll('.map__filters input');
var filterSelects = document.querySelectorAll('.map__filters select');


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

addressField.value = (STARTING_PIN_X + MAIN_PIN_WIDTH / 2) + ', ' + (STARTING_PIN_Y + MAIN_PIN_HEIGTH / 2);

var onMousedownMainPin = function () {
  addressField.value = (STARTING_PIN_X + MAIN_PIN_WIDTH / 2) + ', ' + (STARTING_PIN_Y + MAIN_PIN_HEIGTH + PIN_TIP_HEGHT);
};

var activatePage = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  removeDisableAtrr(adInputs);
  removeDisableAtrr(adSelects);
  removeDisableAtrr(filterInputs);
  removeDisableAtrr(filterSelects);
  onMousedownMainPin();
};


mainPin.addEventListener('mousedown', function () {
  activatePage();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

/* валидация комнат/гостей */
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
capacitySelect.innerHTML = '<option value="1" selected>для 1 гостя</option>';

var CapacityOptionTextContents = {
  '1': ['для 1 гостя'],
  '2': ['для 2 гостей', 'для 1 гостя'],
  '3': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100': ['не для гостей']
};

var CapacityOptionValues = {
  'для 1 гостя': '1',
  'для 2 гостей': '2',
  'для 3 гостей': '3',
  'не для гостей': '0',
};

var onRoomNumberSelectClick = function (evt) {
  var capacityOptions = CapacityOptionTextContents[evt.target.value];
  capacitySelect.innerHTML = '';
  for (var i = 0; i < capacityOptions.length; i++) {
    var capacityOption = document.createElement('option');
    capacityOption.textContent = capacityOptions[i];
    capacityOption.value = CapacityOptionValues[capacityOptions[i]];
    capacitySelect.appendChild(capacityOption);
  }
};

roomNumberSelect.addEventListener('click', onRoomNumberSelectClick);


