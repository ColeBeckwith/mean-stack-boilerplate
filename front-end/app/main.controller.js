(function() {
	'use strict';

	angular
		.module('meanStackBoilerplate')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ["postsService", "loginService"];

	function MainCtrl(postsService, loginService) {
		var vm = this;

		vm.isLoggedIn = loginService.isLoggedIn;

		vm.posts = postsService.posts;

		vm.addPost = function(title, link) {
			if (!title || title === '') {
				return;
			}
			postsService.create({
				title: title,
				link: link
			});
			vm.link = null;
			vm.title = null;
		};

		vm.incrementUpvotes = function(post) {
			postsService.upvote(post);
		}
	}

})();
