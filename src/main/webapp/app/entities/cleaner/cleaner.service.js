(function() {
    'use strict';
    angular
        .module('housekeepinguiApp')
        .factory('Cleaner', Cleaner);

    Cleaner.$inject = ['$resource'];

    function Cleaner ($resource) {
        var resourceUrl =  'backendapi/' + 'api/cleaners/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
