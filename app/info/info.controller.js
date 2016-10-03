(function () {
  'use strict';

  angular
    .module('localDockerApp')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['$http', '$interval', '$location'];

  function InfoController($http, $interval, $location) {
    var vm = this;
    var intervalInfo = 60000;
    var intervalIterator = 10000;
    vm.containers = [];
    var iterator;
    vm.itIndex = 0;
    vm.limit = 12;

    var getInstanceName = function() {
      return $location.host();
    };
    
    vm.getInstanceName = getInstanceName;
    
    function getInfo() {
      $http
        .get('/api/info')
        .then(infoResult, infoErrorResult);
    }

    getInfo();
    $interval(function () {
      getInfo();
    }, intervalInfo);

    $interval(function () {
      nextIndex();
    }, intervalIterator);

    function nextIndex() {
      var nextIndex = vm.itIndex + vm.limit;
      nextIndex < vm.containers.length ?
        vm.itIndex = nextIndex :
        vm.itIndex = 0;
    }

    function infoResult(result) {
      vm.containers = [];
      if (result.data && result.data.length > 0) {
        result.data.forEach(function (item) {
          var container = buildContainerObj(item);
          vm.containers.push(container);
        });
        if(iterator) {
          iterator = iterator();
        }
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
      var colors = {
        created: 'blue',
        warning: 'orange',
        restarting: 'red',
        running: 'green',
        up: 'green',
        paused: 'grey',
        exited: 'red'
      }

      return colors[data.State];
    }

    function getIcon(data) {
      var icons = {
        created: 'sentiment_satisfied',
        warning: 'sentiment_neutral',
        restarting: 'sentiment_dissatisfied',
        running: 'sentiment_very_satisfied',
        up: 'sentiment_very_satisfied',
        paused: 'sentiment_neutral',
        exited: 'sentiment_very_dissatisfied'
      }

      return icons[data.State];
    }

    function getPriority(data) {

      var priority = {
        exited: 0,
        restarting: 1,
        warning: 2,
        up: 3,
        running: 3,
        created: 4,
        paused: 5,
      }

      return priority[data.State];
    }

    function buildContainerObj(data) {
      data.State = data.State.toLowerCase();

      if (data.Status.match(/(up [0-5] minutes)|(seconds)|^(?!exited).+about a minute/i)) {
        data.State = 'warning';
      }

      return {
        name: getName(data),
        created: data.Created || '',
        state: data.State || '',
        status: data.Status || '',
        port: getPort(data),
        version: getVersion(data),
        color: getColor(data),
        icon: getIcon(data),
        priority: getPriority(data)
      };
    }

    function infoErrorResult() { }
  }
})();
