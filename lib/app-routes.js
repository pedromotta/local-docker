var infoRoutes = require('./info').routes;
var deployRoutes = require('./deploy').routes;

var routes = function (app) {
  app.get('/', function (req, res) {
    res.send('rota default');
  });

  app.use('/', infoRoutes);
  app.use('/deploy', deployRoutes);
};

module.exports = routes;
