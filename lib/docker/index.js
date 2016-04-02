var Docker = require('dockerode');

var dockerInstance = new Docker({
  socketPath: '/var/run/docker.sock'
});

var DockerService = function () {
  return dockerInstance;
};

module.exports = DockerService;
