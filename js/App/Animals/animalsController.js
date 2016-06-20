(function () {
    var animalsController = function ($scope, animalsFactory, appSettings, animalsService, pagerService) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.animals = [];
        $scope.appSettings = appSettings;

        function init() {
            animalsFactory.getAnimals()
                .success(function (animals) {
                    $scope.animals = animals.animals
                    animalsService.setAnimals($scope.animals);
                    $scope.setPage(1);
                })
                .error(function (data, status, headers, config) {
                    //handle error
                });
        };

        
        $scope.setPage = function (page) {
            pagerService.GetPage($scope.animals.length, page, 12);
            $scope.pagedAnimals = $scope.animals.slice(pagerService.startIndex, pagerService.endIndex);
            $scope.currentPage = pagerService.currentPage;
            $scope.pages = pagerService.pages;
            $scope.totalPages = pagerService.totalPages;
        }
        $scope.sort = function (propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };

        init();
    };
    animalsController.$inject = ['$scope', 'animalsFactory', 'appSettings', 'animalsService', 'pagerService'];
    angular.module('animalsModule').controller('animalsController', animalsController);
}());