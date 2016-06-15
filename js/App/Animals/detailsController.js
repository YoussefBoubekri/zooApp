(function () {
    var detailsController = function ($scope, $routeParams, animalsFactory, animalsService) {
        var animalId = $routeParams.animalId;
        $scope.animal = null;
        $scope.inTheSameCategory = [];
        var categories = [];

        function init() {
            animalsFactory.getAnimal(animalId)
                .success(function (animal) {
                    $scope.animal = animal;
                    $scope.classe = 12 / animal.images.length;
                    categories = animal.categories;
                    getAnimalsByCategory();
                    $scope.categories=categories;
                })
                .error(function (data, status, headers, config) {
                    //handle error
                });
        };

        function getAnimalsByCategory() {
            var animals = animalsService.getAnimals();
            for (var i = 0; i < animals.length; i++) {
                for (var j = 0; j < animals[i].categories.length; j++) {
                    for (var k = 0; k < categories.length; k++) {
                        if (animals[i].categories[j] === categories[k]) {
                            $scope.inTheSameCategory.push(animals[i]);
                        }
                    }
                }
            }
        };

        init();
    };
    detailsController.$inject = ['$scope', '$routeParams', 'animalsFactory', 'animalsService'];
    angular.module('animalsModule').controller('detailsController', detailsController);
}());