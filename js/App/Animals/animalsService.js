(function () {
    var animalsService = function () {
        var animals = [];

        var setAnimals = function (animals) {
            this.animals = animals;
        };

        var getAnimals = function () {
            return this.animals;
        };

        return {
            setAnimals: setAnimals,
            getAnimals: getAnimals
        };
    }
    angular.module('animalsModule').service('animalsService', animalsService);
}());