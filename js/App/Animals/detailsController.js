(function () {
    var detailsController = function ($scope, $routeParams, animalsFactory, animalsService, pagerService, appSettings) {
        var animalId = $routeParams.animalId;
        $scope.animal = null;
        $scope.inTheSameCategory = [];
        var categories = [];
        $scope.appSettings = appSettings;

        function init() {
            animalsFactory.getAnimal(animalId)
                .success(function (animal) {
                    $scope.animal = animal;
                    $scope.classe = 12 / animal.images.length;
                    categories = animal.categories;
                    $scope.categories = categories;
                    getAnimalsByCategory();
                })
                .error(function (data, status, headers, config) {
                    //handle error
                });
        };

        $scope.setPage = function (page) {
            pagerService.GetPage($scope.inTheSameCategory.length, page, 2);
            $scope.pagedAnimals = $scope.inTheSameCategory.slice(pagerService.startIndex, pagerService.endIndex);
            $scope.currentPage = pagerService.currentPage;
            $scope.pages = pagerService.pages;
            $scope.totalPages = pagerService.totalPages;
        };

        function getAnimalsByCategory() {
            var animals = animalsService.getAnimals();
            if (animals === undefined) {
                animalsFactory.getAnimals()
                    .success(function (an) {
                        animals = an;
                        animalsService.setAnimals(animals);
                        refreshAnimalsList(animals);
                    })
                    .error(function (data, status, headers, config) {
                        //handle error
                    });
            }
            refreshAnimalsList(animals);
        };

        function refreshAnimalsList(an) {
            animals = an;
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
            $scope.setPage(1);
        };
        init();
    };
    detailsController.$inject = ['$scope', '$routeParams', 'animalsFactory', 'animalsService', 'pagerService', 'appSettings'];
    angular.module('animalsModule').controller('detailsController', detailsController);
}());