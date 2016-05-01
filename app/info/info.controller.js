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

      function infoResult(result){
        console.log(result);
        if(result.data && result.data.length > 0){
          result.data.forEach(function(item){
            var container = {
              name: item.Names[0] ? item.Names[0] : '',
              state : item.State ? item.State : '',
              status: item.Status ? item.Status : '',
              port: item.Ports[0] ? item.Ports[0] : '',
              version : item.Version ? item.Version : ''
            }
          vm.containers.push(container);
          })
        }
      }

      function infoErrorResult(err){
      }
    }
})();
