(function () {
    var htmlEntitiesDecoder = function () {
        return function (input) {
            return input.replace(/&#(\d+);/g, function (match, dec) {
                return String.fromCharCode(dec);
            });
        }
    };
    angular.module('animalsModule').filter('htmlEntitiesDecoder', htmlEntitiesDecoder);
}());