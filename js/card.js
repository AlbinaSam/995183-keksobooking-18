'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var card = cardTemplate.cloneNode(true);

  window.card = {
    render: function (adObject) {

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
        for (var i = 0; i < features.length; i++) {
          var featureElement = document.createElement('li');
          featureElement.classList.add('popup__feature', 'popup__feature--' + features[i]);
          featuresList.appendChild(featureElement);
        }
      }

      card.querySelector('.popup__description').textContent = adObject.offer.description;


      /* выводим фотографии */

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

      window.card.close = function () {
        card.remove();
        document.removeEventListener('keydown', window.onEscKeydown);
      };

      cardClose.addEventListener('click', function () {
        window.card.close();
      });

      return card;
    },

    close: function () {
      card.remove();
      document.removeEventListener('keydown', window.onEscKeydown);
    }
  };
})();
