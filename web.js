var util   = require('util'),
  express  = require('express'),
  logistify = require('./routes/logistify'),
  color    = require('cli-color');

process.on('uncaughtException', function(err) {
  util.log(color.red('[main] uncaught exception: '+ err.stack));
});

var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());

// enable cors
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// routes
app.get ('/quote/:scac', logistify.quote);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
