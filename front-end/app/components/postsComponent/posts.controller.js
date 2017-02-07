(function() {
	'use strict';

	angular
		.module('meanStackBoilerplate')
		.controller('postsCtrl', postsCtrl);

	postsCtrl.$inject = ['postsService', 'post', 'loginService'];

	function postsCtrl(postsService, post, loginService) {
		var vm = this;

		vm.isLoggedIn = loginService.isLoggedIn;

		vm.post = post;

		vm.addComment = addComment;
		vm.incrementUpvotes = incrementUpvotes;

		function addComment() {
			if (!vm.body) { return; }
			postsService.addComment(post._id, {
				body: vm.body,
				author: 'user'
			}).then(function(resp) {
				vm.post.comments.push(resp.data);
			});
			vm.body = '';
		}

		function incrementUpvotes(comment) {
			postsService.upvoteComment(vm.post, comment);
		}
	}

})();
