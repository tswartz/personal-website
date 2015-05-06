app.controller('HomeCtrl', function($scope, $http, $location)
{
    // trigger home page animation
    $(document).ready(function() {
        setTimeout( function () {
            $('.logo *').addClass('loaded');
        }, 1000);
    });
});