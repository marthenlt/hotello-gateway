(function () {
    'use strict';

    angular
        .module('housekeepinguiApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
