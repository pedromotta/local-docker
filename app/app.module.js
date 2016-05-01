(function () {
  'use strict';

  angular
    .module('localDockerApp', ['ngRoute', 'ngMaterial', 'md.data.table'])
    .config(routes)
    .config(theme)
    .run();

    function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'info/info.html',
        controller: 'InfoController',
        controllerAs: 'vm'
      })
      .otherwise({
      redirectTo: '/'
    });
    }

    function theme($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('teal')
    .warnPalette('red');
}
})();
