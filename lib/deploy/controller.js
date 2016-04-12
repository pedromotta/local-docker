var logger = require('../commons/logger');
var service = require('./service');

var DeployController = function () {
  this.postImage = function (req, res) {
    var image = req.body.image;
    var version = req.body.version;
    var port = req.body.port;
    if (!image || !version || !port) {
      res.sendStatus(400);
    } else {
      service.deploy(image, version, port, function (err, data) {
        if (err) {
          logger.error(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    }
  };

  return this;
};

module.exports = new DeployController();
