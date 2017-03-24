(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('cleaner', {
            parent: 'entity',
            url: '/cleaner?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Cleaners'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cleaner/cleaners.html',
                    controller: 'CleanerController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
            }
        })
        .state('cleaner-detail', {
            parent: 'cleaner',
            url: '/cleaner/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Cleaner'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/cleaner/cleaner-detail.html',
                    controller: 'CleanerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Cleaner', function($stateParams, Cleaner) {
                    return Cleaner.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'cleaner',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('cleaner-detail.edit', {
            parent: 'cleaner-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cleaner/cleaner-dialog.html',
                    controller: 'CleanerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cleaner', function(Cleaner) {
                            return Cleaner.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cleaner.new', {
            parent: 'cleaner',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cleaner/cleaner-dialog.html',
                    controller: 'CleanerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                cleanerName: null,
                                floorPreferance: null,
                                phoneNo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('cleaner', null, { reload: 'cleaner' });
                }, function() {
                    $state.go('cleaner');
                });
            }]
        })
        .state('cleaner.edit', {
            parent: 'cleaner',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cleaner/cleaner-dialog.html',
                    controller: 'CleanerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Cleaner', function(Cleaner) {
                            return Cleaner.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cleaner', null, { reload: 'cleaner' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('cleaner.delete', {
            parent: 'cleaner',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/cleaner/cleaner-delete-dialog.html',
                    controller: 'CleanerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Cleaner', function(Cleaner) {
                            return Cleaner.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('cleaner', null, { reload: 'cleaner' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
