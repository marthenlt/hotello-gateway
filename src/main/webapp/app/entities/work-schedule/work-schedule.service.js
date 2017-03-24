(function() {
    'use strict';
    angular
        .module('housekeepinguiApp')
        .factory('WorkSchedule', WorkSchedule);

    WorkSchedule.$inject = ['$resource', 'DateUtils'];

    function WorkSchedule ($resource, DateUtils) {
        var resourceUrl =  'backendapi/' + 'api/work-schedules/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.scheduleDate = DateUtils.convertLocalDateFromServer(data.scheduleDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.scheduleDate = DateUtils.convertLocalDateToServer(copy.scheduleDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.scheduleDate = DateUtils.convertLocalDateToServer(copy.scheduleDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
