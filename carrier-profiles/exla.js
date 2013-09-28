(function () {
  "use strict";
  
  var EventEmitter = require('events').EventEmitter;
  module.exports = new EventEmitter();

  var profile = {
    scac: 'exla',
    name: 'Estes Express',
    url: ''
  };

  module.exports.getQuote = function (query) {
    // number between 10 and 50
    // XXX temporary
    var quote = Math.floor((Math.random() * 50) + 10);

    module.exports.emit('quoteReceived', quote);
  };
})();

