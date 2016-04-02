var logger = require('../commons/logger');
var service = require('./service');

var DeployController = function () {
  this.postImage = function (req, res) {
    var image = req.body.image;
    var version = req.body.version;
    if (!image || !version) {
      res.sendStatus(400);
    } else {
      service.deploy(image, version, function (err, data) {
        if (err) {
          logger.error(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    }
  };

  return this;
};

module.exports = new DeployController();
