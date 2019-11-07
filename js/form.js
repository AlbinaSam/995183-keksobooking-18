'use strict';
(function () {

  /* валидация комнат/гостей */

  var roomNumberSelect = document.querySelector('#room_number');

  window.form = {
    capacitySelect: document.querySelector('#capacity'),
    priceField: document.querySelector('#price'),
    typeSelect: document.querySelector('#type')
  };

  window.form.capacitySelect.innerHTML = '<option value="1" selected>для 1 гостя</option>';

  var onRoomNumberSelectChange = function (evt) {
    var capacityOptions = window.consts.capacityOptionTextContents[evt.target.value];
    window.form.capacitySelect.innerHTML = '';
    for (var i = 0; i < capacityOptions.length; i++) {
      var capacityOption = document.createElement('option');
      capacityOption.textContent = capacityOptions[i];
      capacityOption.value = window.consts.capacityOptionValues[capacityOptions[i]];
      window.form.capacitySelect.appendChild(capacityOption);
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

  var onTypeSelectChange = function (evt) {
    var accommodationType = window.consts.accommodationTypes[evt.target.value];
    window.form.priceField.placeholder = accommodationType.placeholder;
    window.form.priceField.min = accommodationType.minValue;
  };

  window.form.typeSelect.addEventListener('change', onTypeSelectChange);

})();
