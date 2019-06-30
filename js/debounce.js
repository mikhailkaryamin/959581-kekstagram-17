'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  var delay = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    delay: delay
  };
})();
