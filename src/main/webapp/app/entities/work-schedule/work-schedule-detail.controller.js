(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .controller('WorkScheduleDetailController', WorkScheduleDetailController);

    WorkScheduleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'WorkSchedule'];

    function WorkScheduleDetailController($scope, $rootScope, $stateParams, previousState, entity, WorkSchedule) {
        var vm = this;

        vm.workSchedule = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('housekeepinguiApp:workScheduleUpdate', function(event, result) {
            vm.workSchedule = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
