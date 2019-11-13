'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  window.card = {
    render: function (adObject) {

      window.map.clickedPin.classList.add('map__pin--active');

      var card = cardTemplate.cloneNode(true);

      card.querySelector('.popup__title').textContent = adObject.offer.title;

      card.querySelector('.popup__text--address').textContent = adObject.offer.address;

      card.querySelector('.popup__text--price').textContent = adObject.offer.price + ' ₽/ночь';

      card.querySelector('.popup__type').textContent = window.consts.accommodationTypes[adObject.offer.type].name;

      card.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей.';

      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout + '.';


      /* выводим удобства */

      var features = adObject.offer.features;
      var featuresList = card.querySelector('.popup__features');

      if (features.length === 0) {
        featuresList.remove();
      } else {
        featuresList.innerHTML = '';

        features.forEach(function (element) {
          var featureElement = document.createElement('li');
          featureElement.classList.add('popup__feature', 'popup__feature--' + element);
          featuresList.appendChild(featureElement);
        });
      }

      /* выводим описание */

      var description = card.querySelector('.popup__description');
      if (adObject.offer.description) {
        description.textContent = adObject.offer.description;
      } else {
        description.remove();
      }


      /* выводим фотографии */

      var photos = adObject.offer.photos;
      var imgList = card.querySelector('.popup__photos');

      if (photos.length === 0) {
        imgList.remove();
      } else {
        imgList.innerHTML = '';

        photos.forEach(function (element) {
          var img = document.createElement('img');
          img.src = element;
          img.classList.add('popup__photo');
          img.width = 45;
          img.height = 40;
          img.alt = 'Фотография жилья';
          imgList.appendChild(img);
        });
      }


      card.querySelector('.popup__avatar').src = adObject.author.avatar;

      var cardClose = card.querySelector('.popup__close');

      cardClose.addEventListener('click', function () {
        window.card.close(card);
      });

      return card;
    },

    close: function (card) {
      card.remove();

      var currentPin = document.querySelector('.map__pin--active');

      if (currentPin) {
        currentPin.classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', window.onEscKeydown);
    }
  };
})();
