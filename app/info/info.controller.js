(function () {
  'use strict';

  angular
  .module('localDockerApp')
  .controller('InfoController', InfoController);

  InfoController.$inject = ['$http', '$interval'];

  function InfoController($http, $interval) {
    var vm = this;
    var intervalInfo = 60000;
    var intervalIterator = 10000;
    vm.containers = [];
    var iterator;
    vm.itIndex = 0;
    vm.limit = 9;

    function getInfo(){
      $http
      .get('/api/info')
      .then(infoResult, infoErrorResult);
    }

    getInfo();
    $interval(function() {
      getInfo();
    }, intervalInfo);

    $interval(function() {
      nextIndex();
    }, intervalIterator);

    function nextIndex(){
      var nextIndex =  vm.itIndex + vm.limit;
      nextIndex < vm.containers.length ?
      vm.itIndex = nextIndex:
      vm.itIndex = 0;
    }

    function infoResult(result) {
      vm.containers = [];
      if (result.data && result.data.length > 0) {
        result.data.forEach(function (item) {
          var container = buildContainerObj(item);
          vm.containers.push(container);
        });
        iterator = iterator();
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

    function getColor(data) {

      switch(data.State) {
        case 'created':
        return 'blue';
        case 'restarting':
        return 'orange';
        case 'running':
        return 'green';
        case 'paused':
        return 'grey';
        case 'exited':
        return 'red';
        default:
        return '';
      }
    }

    function getIcon(data) {
      switch(data.State) {
        case 'created':
        return 'sentiment_satisfied';
        case 'restarting':
        return 'sentiment_dissatisfied';
        case 'running':
        return 'sentiment_very_satisfied';
        case 'paused':
        return 'sentiment_neutral';
        case 'exited':
        return 'sentiment_very_dissatisfied';
        default:
        return '';
      }
    }

    function convertState(data){
      if (!data.State) {
        if (data.Status.indexOf('Up') === 0) {
          data.State = 'running';
        } else if (data.Status.toLowerCase().indexOf('restarting') > -1) {
          data.State = 'restarting';
        } else if (data.Status.toLowerCase().indexOf('created') > -1) {
          data.State = 'created';
        } else if (data.Status.toLowerCase().indexOf('paused') > -1) {
          data.State = 'paused';
        } else if (data.Status.toLowerCase().indexOf('exited') > -1) {
          data.State = 'exited';
        }
      }
    }

    function buildContainerObj(data) {
      convertState(data);
      return {
        name: getName(data),
        created: data.Created || '',
        state: data.State || '',
        status: data.Status || '',
        port: getPort(data),
        version: getVersion(data),
        color: getColor(data),
        icon: getIcon(data)
      };
    }

    function infoErrorResult() {}
  }
})();
