(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .controller('CleanerDetailController', CleanerDetailController);

    CleanerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Cleaner'];

    function CleanerDetailController($scope, $rootScope, $stateParams, previousState, entity, Cleaner) {
        var vm = this;

        vm.cleaner = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('housekeepinguiApp:cleanerUpdate', function(event, result) {
            vm.cleaner = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
