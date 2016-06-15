(function () {
    var animalsController = function ($scope, animalsFactory, appSettings, animalsService) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.animals = [];
        $scope.appSettings = appSettings;

        function init() {
            animalsFactory.getAnimals()
                .success(function (animals) {
                    $scope.animals = animals.animals
                    animalsService.setAnimals($scope.animals);
                })
                .error(function (data, status, headers, config) {
                    //handle error
                });
        }
        $scope.sort = function (propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };

        init();
    };
    animalsController.$inject = ['$scope', 'animalsFactory', 'appSettings', 'animalsService'];
    angular.module('animalsModule').controller('animalsController', animalsController);
}());