(function () {
  'use strict';

  angular
    .module('localDockerApp')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['$http'];

  function InfoController($http) {
    var vm = this;
    vm.containers = [];
    $http
      .get('/api/info')
      .then(infoResult, infoErrorResult);

    function infoResult(result) {
      if (result.data && result.data.length > 0) {
        result.data.forEach(function (item) {
          var container = buildContainerObj(item);
          vm.containers.push(container);
        });
      }
    }

    function getName(data) {
      var name = '';
      var nameParts;
      var fullNameParts = data.Image.split(':');

      if (fullNameParts.length) {
        nameParts = fullNameParts[0].split('/');
        if (nameParts.length > 1) {
          name = nameParts[1];
        } else if (nameParts.length) {
          name = nameParts[0];
        }
      }

      return name;
    }

    function getPort(data) {
      var port = '';
      var ports = data.Ports;
      if (ports && ports[0]) {
        port = ports[0].PublicPort;
      }
      return port;
    }

    function getVersion(data) {
      var version = '-';
      var imageParts = data.Image.split(':');

      if (imageParts.length === 2) {
        version = imageParts[1];
      }
      return version;
    }

    function buildContainerObj(data) {
      return {
        name: getName(data),
        state: data.State || '',
        status: data.Status || '',
        port: getPort(data),
        version: getVersion(data)
      };
    }

    function infoErrorResult() {}
  }
})();
