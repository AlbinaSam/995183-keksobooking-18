'use strict';
(function () {

  var prepareRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
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

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };


  window.backend = {

    load: function (onLoad, onError) {

      var xhr = prepareRequest(onLoad, onError);

      xhr.timeout = window.consts.TIMEOUT;

      xhr.open('GET', window.consts.URL_LOAD);
      xhr.send();
    },

    send: function (data, onLoad, onError) {

      var xhr = prepareRequest(onLoad, onError);

      xhr.open('POST', window.consts.URL_SEND);
      xhr.send(data);
    }
  };
})();
