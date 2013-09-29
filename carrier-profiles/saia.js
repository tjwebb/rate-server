(function () {
  "use strict";
  
  var EventEmitter = require('events').EventEmitter;
  module.exports = new EventEmitter();

  var profile = {
    scac: 'saia',
    name: 'Saia',
    url: ''
  };

  module.exports.getQuote = function (query) {
    var quote = ((Math.random() * 400) + 500).toFixed(2);

    module.exports.emit('quoteReceived', quote);
  };
})();

