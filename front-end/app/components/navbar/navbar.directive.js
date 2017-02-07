(function () {
	'use strict';

	angular
		.module('meanStackBoilerplate')
		.directive('meanNavbar', meanNavbarDirective);

	meanNavbarDirective.$inject = ['loginService'];

	function meanNavbarDirective(loginService) {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/navbar/navbar.html',
			controller: navbarCtrl,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function navbarCtrl() {
			var vm = this;

			vm.isLoggedIn = loginService.isLoggedIn;
			vm.currentUser = loginService.currentUser;
			vm.logOut = loginService.logOut;
		}
	}

})();
