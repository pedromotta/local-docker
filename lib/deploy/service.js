var logger = require('../commons/logger');
var docker = require('../docker')();

var DeployService = function () {
  // docker create -p $APP_PORT -v $APP_CONF_VOLUME -v $APP_LOGS_VOLUME
  // --restart=always --log-driver=json-file --log-opt max-size=100m --log-opt max-file=1
  // --hostname=$CONTAINER --name=$CONTAINER_NAME $IMAGE:$VERSION

  this.deploy = function (image, version, port, callback) {
    var newImage = image + ':' + version;
    var keyPort = port + '/tcp';
    var exposedPorts = {};
    var portBindings = {};

    exposedPorts[keyPort] = {};
    portBindings[keyPort] = [{
      HostPort: port
    }];

    docker.createContainer({
      name: 'name',
      Hostname: 'hostname',
      Image: newImage,
      Tty: false,
      ExposedPorts: exposedPorts,
      PortBindings: portBindings,
      Binds: ['/opt/log:/usr/src/app/log'],
      LogConfig: {
        Type: 'json-file',
        Config: {
          'max-size': '100m',
          'max-file': '1'
        }
      },
      RestartPolicy: {
        Name: 'always'
      }
    }, function (err, container) {
      if (err) {
        logger.error('error create container:%j', err);
      } else {
        logger.info('container %s created:', container.id);
        container.start(function (startErr, data) {
          if (err) {
            logger.error('error start container %s:', container.id, startErr);
          } else {
            logger.info('container %s started:', container.id);
          }
          callback(err, data);
        });
      }
      callback(err, container);
    });
  };

  return this;
};

module.exports = new DeployService();
