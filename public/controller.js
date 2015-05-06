var app = angular.module("TaliaApp", ["ngRoute"]);

app.controller('HomeController', function($scope, $http, $location, $sce)
{

});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'about.html'
    }).
    otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
}]);