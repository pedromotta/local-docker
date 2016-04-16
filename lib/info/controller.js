var service = require('./service');

var InfoController = function () {
  this.getInfo = function (req, res) {
    service.getInfo(function (err, containers) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(containers).end();
      }
    });
  };

  this.render = function (req, res) {
    service.getInfo(function (err, containers) {
      if (err) {
        res.render('error', {
          message: err
        });
      } else {
        res.render('info', {
          containers: containers
        });
      }
    });
  };

  return this;
};

module.exports = new InfoController();
