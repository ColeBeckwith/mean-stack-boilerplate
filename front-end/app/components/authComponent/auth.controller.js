(function() {
	'use strict';

	angular
		.module('meanStackBoilerplate')
		.controller('authCtrl', authCtrl);

	authCtrl.$inject = ['$state', 'loginService'];

	function authCtrl($state, loginService) {
		var vm = this;

		vm.user = {};

		vm.registerUser = registerUser;
		vm.logIn = logIn;

		function registerUser() {
			loginService.registerUser(vm.user).then(function(resp) {
				$state.go('home');
			})
		}

		function logIn() {
			loginService.logIn(vm.user).then(function(resp) {
				$state.go('home');
			})
		}
	}

})();
