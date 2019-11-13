'use strict';

(function () {

  window.consts = {
    ENTER_KEYCODE: 13,

    ESC_KEYCODE: 27,

    MIN_X_VALUE: 0,

    MAX_X_VALUE: 1200,

    MIN_Y_VALUE: 130,

    MAX_Y_VALUE: 630,

    accommodationTypes: {

      'bungalo': {'name': 'Бунгало', 'placeholder': '0', 'minValue': '0'},

      'flat': {'name': 'Квартира', 'placeholder': '1000', 'minValue': '1000'},

      'house': {'name': 'Дом', 'placeholder': '5000', 'minValue': '5000'},

      'palace': {'name': 'Дворец', 'placeholder': '10000', 'minValue': '10000'}

    },

    MAIN_PIN_WIDTH: 62,

    MAIN_PIN_HEIGTH: 62,

    PIN_WIDTH: 50,

    PIN_HEIGHT: 70,

    PIN_TIP_HEIGHT: 22,

    STARTING_PIN_X: 570,

    STARTING_PIN_Y: 375,

    capacityOptionTextContents: {

      '1': ['для 1 гостя'],
      '2': ['для 2 гостей', 'для 1 гостя'],
      '3': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
      '100': ['не для гостей']

    },

    capacityOptionValues: {

      'для 1 гостя': '1',
      'для 2 гостей': '2',
      'для 3 гостей': '3',
      'не для гостей': '0',

    },

    TIMEOUT: 10000,

    URL_LOAD: 'https://js.dump.academy/keksobooking/data',

    URL_SEND: 'https://js.dump.academy/keksobooking',

    SUCCESS_CODE: 200,

    CORRECT_QUANTITY: 5,

    MAX_PRICE: 50000,

    MIN_PRICE: 10000,

    LOW_PRICE: 'low',

    HIGH_PRICE: 'high',

    MIDDLE_PRICE: 'middle',

    DEBOUNCE_INTERVAL: 500,

    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    DEFAULT_CAPACITY_VALUE: '<option value="1" selected>для 1 гостя</option>',

    DEFAULT_AVATAR: 'img/muffin-grey.svg'
  };

})();
