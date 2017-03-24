(function() {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('work-schedule', {
            parent: 'entity',
            url: '/work-schedule?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'WorkSchedules'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/work-schedule/work-schedules.html',
                    controller: 'WorkScheduleController',
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
        .state('work-schedule-detail', {
            parent: 'work-schedule',
            url: '/work-schedule/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'WorkSchedule'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/work-schedule/work-schedule-detail.html',
                    controller: 'WorkScheduleDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'WorkSchedule', function($stateParams, WorkSchedule) {
                    return WorkSchedule.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'work-schedule',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('work-schedule-detail.edit', {
            parent: 'work-schedule-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/work-schedule/work-schedule-dialog.html',
                    controller: 'WorkScheduleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WorkSchedule', function(WorkSchedule) {
                            return WorkSchedule.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('work-schedule.new', {
            parent: 'work-schedule',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/work-schedule/work-schedule-dialog.html',
                    controller: 'WorkScheduleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                scheduleDate: null,
                                desc: null,
                                rooms: null,
                                cleaners: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('work-schedule', null, { reload: 'work-schedule' });
                }, function() {
                    $state.go('work-schedule');
                });
            }]
        })
        .state('work-schedule.edit', {
            parent: 'work-schedule',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/work-schedule/work-schedule-dialog.html',
                    controller: 'WorkScheduleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WorkSchedule', function(WorkSchedule) {
                            return WorkSchedule.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('work-schedule', null, { reload: 'work-schedule' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('work-schedule.delete', {
            parent: 'work-schedule',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/work-schedule/work-schedule-delete-dialog.html',
                    controller: 'WorkScheduleDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['WorkSchedule', function(WorkSchedule) {
                            return WorkSchedule.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('work-schedule', null, { reload: 'work-schedule' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
