(function () {
  "use strict";

  var profiles = {
    'pitd': require('./pitd'),
    'cnwy': require('./cnwy'),
    'saia': require('./saia'),
    'exla': require('./exla'),
    'abfs': require('./abfs')
  };
  exports.use = function (scac) {
    var profile = profiles[(scac || "").toLowerCase()];
    if (!profile) throw JSON.stringify({
      error: "SCAC code ["+ scac +"] not supported."
    });

    return profile;
  };
})();
