(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .controller('WorkScheduleDialogController', WorkScheduleDialogController);

    WorkScheduleDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'WorkSchedule'];

    function WorkScheduleDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, WorkSchedule) {
        var vm = this;

        vm.workSchedule = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.workSchedule.id !== null) {
                WorkSchedule.update(vm.workSchedule, onSaveSuccess, onSaveError);
            } else {
                WorkSchedule.save(vm.workSchedule, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('housekeepinguiApp:workScheduleUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.scheduleDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
