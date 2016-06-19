(function () {
    var detailsController = function ($scope, $routeParams, animalsFactory, animalsService, pagerService) {
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
                    $scope.categories = categories;
                    $scope.setPage(1);
                })
                .error(function (data, status, headers, config) {
                    //handle error
                });
        };

        $scope.setPage = function (page) {
            pagerService.GetPage($scope.inTheSameCategory.length, page, 5);
            $scope.pagedAnimals = $scope.inTheSameCategory.slice(pagerService.startIndex, pagerService.endIndex);
            $scope.currentPage = pagerService.currentPage;
            $scope.pages = pagerService.pages;
            $scope.totalPages = pagerService.totalPages;
        }

        function getAnimalsByCategory() {
            var animals = animalsService.getAnimals();
            if(animals===undefined){
                animalsFactory.getAnimals()
                .success(function (an) {
                    animals = an.animals
                    animalsService.setAnimals(animals);
                })
                .error(function (data, status, headers, config) {
                    //handle error
                });
            }
            for (var i = 0; i < animals.length; i++) {
                for (var j = 0; j < animals[i].categories.length; j++) {
                    for (var k = 0; k < categories.length; k++) {
                        if (animals[i].categories[j] === categories[k]) {
                            if ($scope.inTheSameCategory.indexOf(animals[i] !== -1)) {
                                $scope.inTheSameCategory.push(animals[i]);
                            }
                        }
                    }
                }
            }
        };

        init();
    };
    detailsController.$inject = ['$scope', '$routeParams', 'animalsFactory', 'animalsService', 'pagerService'];
    angular.module('animalsModule').controller('detailsController', detailsController);
}());