(function () {
  "use strict";

  var profiles = {
    'pitd': require('./pitd')
  };
  exports.use = function (scac) {
    console.log(scac);
    var profile = profiles[(scac || "").toLowerCase()];
    if (!profile) throw "SCAC code ["+ scac +"] not supported.";

    return profile;
  };
})();
