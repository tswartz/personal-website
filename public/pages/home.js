app.controller('HomeCtrl', function($scope, $http, $location)
{
    $(document).ready(function() {
        console.log("heyyyyy boiiiiiiii");
        // add loaded class to cover photo text so it can fade in
        $('.cover-photo-text').addClass("loaded");
        console.log("added loaded", $('.cover-photo-text'));


        // set icon hover effect for each nav bar item
        // $('.nav-bar-item').each(function(index, navBarItem){
        //  setIconHoverEffect(index, navBarItem);
        // });

    });
});