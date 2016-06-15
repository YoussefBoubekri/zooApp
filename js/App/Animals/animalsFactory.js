(function () {
    var animalsFactory = function ($http) {
        var factory = {};
        factory.getAnimals = function () {
            return $http.get('http://zoo.cyrilmoral.es/api/v1/animals');
        };
        factory.getAnimal = function (animalId) {
            return $http.get('http://zoo.cyrilmoral.es/api/v1/animals/' + animalId);
        };
        return factory;
    };
    animalsFactory.inject = ['$http'];

    angular.module('animalsModule').factory('animalsFactory', animalsFactory);
}());