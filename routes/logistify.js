(function () {
  "use strict";

  var util = require('util'),
      profiles = require('../carrier-profiles');

  /**
  * Get a rate quote.
  *
  * req.params = {
  *  scac: STRING
  * }
  * req.query = {
  *  account: STRING
  *  username: STRING
  *  password: STRING
  *  fromZip: NUMBER
  *  toZip: NUMBER
  *  freightClass: NUMBER
  *  weight: NUMBER (pounds)
  * }
  */
  module.exports.quote = function (req, res) {
    var scac = req.params.scac;
    var carrier = profiles.use(scac);

    carrier.on('quoteReceived', function (quote) {
      res.json({ scac: scac, quote: quote });
    });
    carrier.getQuote(req.query);
  };
})();
