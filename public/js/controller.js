var app = angular.module("TaliaApp", ["ngRoute"]);

app.controller('HomeController', function($scope, $http, $location, $sce)
{
    $scope.toggleNavbar = function () {
        $('.nav-bar').toggleClass('show-nav-bar');
        $('.nav-icon-container').toggleClass('show-nav-bar');
    }

    $scope.scrollToTop = function () {
        $('html,body').animate({
          scrollTop: 0
        }, 1000);
    }

});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'pages/home/home.html',
        controller: 'HomeCtrl'
    }).
    when('/about', {
        templateUrl: 'pages/about/about.html'
    }).
    when('/code', {
        templateUrl: 'pages/code/code.html'
    }).
    when('/art', {
        templateUrl: 'pages/art/art.html'
    }).
    when('/contact', {
        templateUrl: 'pages/contact/contact.html'
    }).
    otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
}]);