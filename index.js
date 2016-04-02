var ROOT_PATH = process.cwd();

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var logger = require('./lib/commons/logger');

var pkg = require(ROOT_PATH + '/package.json');

var ApiNode = (function () {
  var server;
  var appTitle = pkg.name + ':' + pkg.version;
  var app = express();

  process.title = appTitle;

  process.on('exit', function () {
    logger.warn('exit');
  });

  app.use(bodyParser.json());

  morgan.token('req-body', function reqBody(req) {
    return JSON.stringify(req.body);
  });

  app.use(morgan(':method :url - :req-body - :status', {
    stream: logger.stream
  }));

  require('./lib/app-routes')(app);

  server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    server.on('close', function () {
      logger.warn('close');
    });

    logger.info('App - %s - listening at http://%s:%s', appTitle, host, port);
  });

  return server;
}());

module.exports = ApiNode;
