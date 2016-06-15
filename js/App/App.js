(function () {

    var animalsModule = angular.module('animalsModule', ['ngRoute']);
    animalsModule.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'animalsController',
                templateUrl: '../../html/views/animals/animals.html'
            })
            .when('/animals/:animalId', {
                controller: 'detailsController',
                templateUrl: '../../html/views/animals/details.html'
            })
            .otherwise({
                redirectTo: '/'
            });

    });
}());