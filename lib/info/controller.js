var service = require('./service');

var InfoController = function () {
  
  this.getInfo = function (req, res) {
    res.status(200).json(GLOBAL.containers).end();
  };
  
  return this;
};

module.exports = new InfoController();
