(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .controller('CleanerDialogController', CleanerDialogController);

    CleanerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Cleaner'];

    function CleanerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Cleaner) {
        var vm = this;

        vm.cleaner = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.cleaner.id !== null) {
                Cleaner.update(vm.cleaner, onSaveSuccess, onSaveError);
            } else {
                Cleaner.save(vm.cleaner, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('housekeepinguiApp:cleanerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
