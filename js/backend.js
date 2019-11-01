'use strict';
(function () {

  var xhr;

  var prepareRequest = function (onLoad, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.consts.SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
  };


  window.backend = {

    load: function (onLoad, onError) {

      prepareRequest(onLoad, onError);

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.consts.TIMEOUT;

      xhr.open('GET', window.consts.URL_LOAD);
      xhr.send();
    },

    send: function (data, onLoad, onError) {

      prepareRequest(onLoad, onError);

      xhr.open('POST', window.consts.URL_SEND);
      xhr.send(data);
    }
  };
})();
