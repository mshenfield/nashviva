(function(){
    angular.module('home', ['ngRoute', 'factories'])

.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
    });
})
.controller('HomeController', function(PublicInfoFactory, MapFactory){
    //Initialize the Leaflet.js map. 
    var map = MapFactory,
        info = PublicInfoFactory,
        vm = this;

    var leaf = map.initMap();

    vm.toggle = function(type){
        if(vm[type]){
            vm[type].forEach(function(point){
              var op = point.options.opacity > 0 ? 0 : 1;
              point.setOpacity(op);
            });
        }
        else{
            info[type]()
            .success(function (data) {
                var markPoints = data.map(function(el){
                    return [el.location.reverse(), {title:el.address}];
                });
                vm[type] = map.PlacePoints(markPoints, leaf);
            })
            .error(function (data) {
                console.error(data);
            });
        }
    };

    
    vm.toggle('fire');
});

})();
