var docker = require('../docker')();

var InfoService = function () {
  this.getInfo = function (callback) {
    docker.listContainers(callback);
  };

  return this;
};

module.exports = new InfoService();
