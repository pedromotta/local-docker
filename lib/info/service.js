var docker = require('../docker')();

var InfoService = function () {
  this.getInfo = function (callback) {
    docker.listContainers({
      filters: {
        status: ['restarting', 'running', 'exited']
      }
    }, callback);
  };

  return this;
};

module.exports = new InfoService();
