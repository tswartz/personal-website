app.controller('HomeCtrl', function($scope, $http, $location)
{
    $(document).ready(function() {
        // add loaded class to cover photo text so it can fade in
        setTimeout( function () {
            $('.logo *').addClass('loaded');
        }, 1000);
        


        // set icon hover effect for each nav bar item
        // $('.nav-bar-item').each(function(index, navBarItem){
        //  setIconHoverEffect(index, navBarItem);
        // });

    });
});