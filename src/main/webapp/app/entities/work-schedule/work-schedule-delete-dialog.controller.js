(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .controller('WorkScheduleDeleteController',WorkScheduleDeleteController);

    WorkScheduleDeleteController.$inject = ['$uibModalInstance', 'entity', 'WorkSchedule'];

    function WorkScheduleDeleteController($uibModalInstance, entity, WorkSchedule) {
        var vm = this;

        vm.workSchedule = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            WorkSchedule.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
