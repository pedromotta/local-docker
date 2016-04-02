var service = require('./service');

var InfoController = function () {
  this.getInfo = function (req, res) {
    service.getInfo(function (err, containers) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(containers).end();
      }
    });
  };

  return this;
};

module.exports = new InfoController();
