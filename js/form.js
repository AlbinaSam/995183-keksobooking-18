'use strict';
(function () {

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

  /* валидация комнат/гостей */

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
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

  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

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

  var typeSelect = document.querySelector('#type');
  var priceField = document.querySelector('#price');

  var onTypeSelectChange = function (evt) {
    var accommodationType = window.consts.accommodationTypes[evt.target.value];
    priceField.placeholder = accommodationType.placeholder;
    priceField.min = accommodationType.minValue;
  };

  typeSelect.addEventListener('change', onTypeSelectChange);

})();
