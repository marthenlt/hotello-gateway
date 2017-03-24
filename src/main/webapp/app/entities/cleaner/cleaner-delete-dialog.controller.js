(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .controller('CleanerDeleteController',CleanerDeleteController);

    CleanerDeleteController.$inject = ['$uibModalInstance', 'entity', 'Cleaner'];

    function CleanerDeleteController($uibModalInstance, entity, Cleaner) {
        var vm = this;

        vm.cleaner = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Cleaner.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
