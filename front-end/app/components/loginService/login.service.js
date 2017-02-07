(function() {
	'use strict';

	angular
		.module('meanStackBoilerplate')
		.service('loginService', loginService);

	loginService.$inject = ['$http', '$window'];

	function loginService($http, $window) {
		var svc = this;

		svc.saveToken = saveToken;
		svc.getToken = getToken;
		svc.isLoggedIn = isLoggedIn;
		svc.currentUser = currentUser;

		svc.registerUser = registerUser;
		svc.logIn = logIn;
		svc.logOut = logOut;

		function saveToken(token) {
			$window.localStorage['api-token'] = token;
		}

		function getToken() {
			return $window.localStorage['api-token'];
		}

		function isLoggedIn() {
			var token = svc.getToken();
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		}

		function currentUser() {
			if (svc.isLoggedIn()) {
				var token = svc.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.username;
			}
		}

		function registerUser(user) {
			return $http.post('/register', user).then(function(resp) {
				svc.saveToken(resp.data.token)
			})
		}

		function logIn(user) {
			return $http.post('/login', user).then(function(resp) {
				svc.saveToken(resp.data.token);
			});
		}

		function logOut() {
			$window.localStorage.removeItem('api-token');
		}
	}

})();
