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
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGTH = 62;
var PIN_TIP_HEGHT = 22;
var STARTING_PIN_X = 570;
var STARTING_PIN_Y = 375;

var type = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var capacityOptionTextContents = {
  '1': ['для 1 гостя'],
  '2': ['для 2 гостей', 'для 1 гостя'],
  '3': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100': ['не для гостей']
};

var capacityOptionValues = {
  'для 1 гостя': '1',
  'для 2 гостей': '2',
  'для 3 гостей': '3',
  'не для гостей': '0',
};

var accommodationTypes = {
  'bungalo': {'placeholder': '0', 'minValue': '0'},
  'flat': {'placeholder': '1000', 'minValue': '1000'},
  'house': {'placeholder': '5000', 'minValue': '5000'},
  'palace': {'placeholder': '10000', 'minValue': '10000'}
};

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
    var pin = renderPin(adsList[i]);
    pin.dataset.index = [i];
    fragment.appendChild(pin);
  }
};

fillFragment();


var mapContainer = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var renderCard = function (adObject) {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = adObject.offer.title;

  card.querySelector('.popup__text--address').textContent = adObject.offer.address;

  card.querySelector('.popup__text--price').textContent = adObject.offer.price + ' ₽/ночь';

  card.querySelector('.popup__type').textContent = type[adObject.offer.type];

  card.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей.';

  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout + '.';


  /* выводим удобства */

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


  /* выводим фотографии*/

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

  var cardClose = card.querySelector('.popup__close');

  cardClose.addEventListener('click', function () {
    closeCard();
  });

  return card;
};


var mapFilters = document.querySelector('.map__filters-container');


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
var adForm = document.querySelector('.ad-form');

addressField.value = (STARTING_PIN_X + MAIN_PIN_WIDTH / 2) + ', ' + (STARTING_PIN_Y + MAIN_PIN_HEIGTH / 2);

var fillAddressField = function () {
  addressField.value = (STARTING_PIN_X + MAIN_PIN_WIDTH / 2) + ', ' + (STARTING_PIN_Y + MAIN_PIN_HEIGTH + PIN_TIP_HEGHT);
};

var activatePage = function () {
  mapContainer.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  removeDisableAtrr(adInputs);
  removeDisableAtrr(adSelects);
  removeDisableAtrr(filterInputs);
  removeDisableAtrr(filterSelects);
  fillAddressField();
  pinsList.appendChild(fragment);
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

var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');
capacitySelect.innerHTML = '<option value="1" selected>для 1 гостя</option>';


var onRoomNumberSelectChange = function (evt) {
  var capacityOptions = capacityOptionTextContents[evt.target.value];
  capacitySelect.innerHTML = '';
  for (var i = 0; i < capacityOptions.length; i++) {
    var capacityOption = document.createElement('option');
    capacityOption.textContent = capacityOptions[i];
    capacityOption.value = capacityOptionValues[capacityOptions[i]];
    capacitySelect.appendChild(capacityOption);
  }
};

roomNumberSelect.addEventListener('change', onRoomNumberSelectChange);


/* валидация времени заезда/выезда */

var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

var onTimeInSelectChange = function (evt) {
  var timeInSelectOption = evt.target.value;
  timeOutSelect.value = timeInSelectOption;
};

var onTimeOutSelectChange = function (evt) {
  var timeOutSelectOption = evt.target.value;
  timeInSelect.value = timeOutSelectOption;
};

timeInSelect.addEventListener('change', onTimeInSelectChange);
timeOutSelect.addEventListener('change', onTimeOutSelectChange);


/* валидация типа жилья/цены  */

var typeSelect = adForm.querySelector('#type');
var priceField = adForm.querySelector('#price');

var onTypeSelectChange = function (evt) {
  var accommodationType = accommodationTypes[evt.target.value];
  priceField.placeholder = accommodationType.placeholder;
  priceField.min = accommodationType.minValue;
};

typeSelect.addEventListener('change', onTypeSelectChange);


/* показ/скрытие карточек объявлений */

var card = null;

var closeCard = function () {
  card.remove();
  document.removeEventListener('keydown', onEscKeydown);
};

var onEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

var onMapClick = function (evt) {
  var clickedPin = evt.target.closest('button.map__pin:not(.map__pin--main)');

  if (!clickedPin) {
    return;
  }

  var pinIndex = clickedPin.dataset.index;

  if (card) {
    card.remove();
  }
  card = renderCard(adsList[pinIndex]);
  mapContainer.insertBefore(card, mapFilters);
  document.addEventListener('keydown', onEscKeydown);
};

mapContainer.addEventListener('click', onMapClick);
