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

    capacityOptionContents: {

      '1': [{text: 'для 1 гостя', value: '1'}],
      '2': [
        {text: 'для 2 гостей', value: '2'},
        {text: 'для 1 гостя', value: '1'}
      ],
      '3': [
        {text: 'для 3 гостей', value: '3'},
        {text: 'для 2 гостей', value: '2'},
        {text: 'для 1 гостя', value: '1'}
      ],
      '100': [{text: 'не для гостей', value: '0'}]
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
