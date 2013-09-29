(function () {
  "use strict";
  
  var EventEmitter = require('events').EventEmitter;
  module.exports = new EventEmitter();

  var profile = {
    scac: 'cnwy',
    name: 'Conway',
    url: 'https://www.con-way.com/XMLj/X-Rate'
  };

  module.exports.getQuote = function (query) {
    var quote = ((Math.random() * 50) + 100).toFixed(2);

    module.exports.emit('quoteReceived', quote);
  };
})();

