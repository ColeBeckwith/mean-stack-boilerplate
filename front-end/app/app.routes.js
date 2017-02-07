(function() {
	'use strict';

	angular
		.module('meanStackBoilerplate')
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'app/main.html',
					controller: 'MainCtrl',
					controllerAs: 'vm',
					resolve: {
						postPromise: ['postsService', function(postsService) {
							return postsService.getAll();
						}]
					}
				})
				.state('posts', {
					url: '/posts/{id}',
					templateUrl: 'app/components/postsComponent/posts.html',
					controller: 'postsCtrl',
					controllerAs: 'vm',
					resolve: {
						post: ['$stateParams', 'postsService', function($stateParams, postsService) {
							return postsService.get($stateParams.id);
						}]
					}
				})
				.state('login', {
					url: '/login',
					templateUrl: 'app/components/authComponent/login.html',
					controller: 'authCtrl',
					controllerAs: 'vm',
					onEnter: ['$state', 'loginService', function($state, loginService) {
						if (loginService.isLoggedIn()) {
							$state.go('home');
						}
					}]

				})
				.state('register', {
					url: '/register',
					templateUrl: 'app/components/authComponent/register.html',
					controller: 'authCtrl',
					controllerAs: 'vm',
					onEnter: ['$state', 'loginService', function($state, loginService) {
						if (loginService.isLoggedIn()) {
							$state.go('home');
						}
					}]
				});

			$urlRouterProvider.otherwise('home');
		}]);

})();
