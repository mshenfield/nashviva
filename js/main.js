(function () {

'use strict';

angular.module('nashviva', ['ngRoute','home'])
.config(function($routeProvider){
    $routeProvider.otherwise({redirectTo: '/'});
});

})();
