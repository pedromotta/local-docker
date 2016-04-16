(function () {
  'use strict';

  angular
    .module('localDockerApp')
    .controller('InfoController', InfoController);

    InfoController.$inject = [];

    function InfoController() {
      var vm = this;
      console.log('info');
    }
})();
