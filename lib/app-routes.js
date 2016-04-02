var xptoRoutes = require('./xpto').routes;

var routes = function (app) {
  app.get('/', function (req, res) {
    res.send('rota default');
  });

  app.use('/xpto', xptoRoutes);
};

module.exports = routes;
