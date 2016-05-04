(function () {
  'use strict';

  angular
    .module('localDockerApp', ['ngRoute', 'ngMaterial', 'angularMoment','ngFitText'])
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
    .primaryPalette('grey',{
      'default': '900',
    })
    .accentPalette('teal')
    .warnPalette('red');
}
})();
