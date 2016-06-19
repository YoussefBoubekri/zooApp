(function () {
    var pagerService = function () {
        var length;
        var startIndex;
        var endIndex;
        var startPage;
        var endPage;
        var currentPage;
        var pageSize;
        var totalPages;
        var pages = [];

        var createRange = function (start, stop, step) {
            if (stop == null) {
                stop = start || 0;
                start = 0;
            }
            step = step || 1;
            var length = Math.max(Math.ceil((stop - start) / step), 0);
            var range = Array(length);
            for (var idx = 0; idx < length; idx++, start += step) {
                range[idx] = start;
            }

            return range;
        };

        var GetPage = function (length, currentPage, pageSize) {
            this.currentPage = currentPage || 1;
            pageSize = pageSize || 10;
            this.totalPages = Math.ceil(length / pageSize);
            if (this.totalPages <= 10) {
                startPage = 1;
                endPage = this.totalPages;
            } else {
                if (this.currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (this.currentPage + 4 >= this.totalPages) {
                    startPage = this.totalPages - 9;
                    endPage = this.totalPages;
                } else {
                    startPage = this.currentPage - 5;
                    endPage = this.currentPage + 4;
                }
            }
            this.startIndex = (this.currentPage - 1) * pageSize;
            this.endIndex = this.startIndex + pageSize;
            this.pages = createRange(startPage, endPage + 1);

        };

        return {
            startIndex: startIndex,
            endIndex: endIndex,
            GetPage: GetPage,
            currentPage:currentPage,
            pages:pages,
            totalPages:totalPages
        };
    }
    angular.module('animalsModule').service('pagerService', pagerService);
}());