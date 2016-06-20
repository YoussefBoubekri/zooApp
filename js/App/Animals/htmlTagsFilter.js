(function () {
    var htmlTagsFilter = function () {
        return function (input) {
            return input ? String(input).replace(/<[^>]+>/gm, '') : '';
        }
    };
    angular.module('animalsModule').filter('htmlTagsFilter', htmlTagsFilter);
}());