(function() {
	'use strict';

	angular
		.module('meanStackBoilerplate')
		.service('postsService', postsService);

	postsService.$inject = ['$http', 'loginService'];

	function postsService($http, loginService) {
		var svc = this;

		svc.posts = [];

		svc.get = function(id) {
			return $http.get('/posts/' + id).then(function(res) {
				return res.data;
			})
		};

		svc.getAll = function() {
			return $http.get('/posts').then(function(resp) {
				angular.copy(resp.data, svc.posts);
			})
		};

		svc.create = function(post) {
			return $http.post('/posts', post, {
			    headers: {
			        Authorization: 'Bearer ' + loginService.getToken()
			    }
			}).then(function(resp) {
				svc.posts.push(resp.data);
			});
		};

		svc.upvote = function(post) {
			return $http.put('/posts/' + post._id + '/upvote', null, {
                headers: {
                    Authorization: 'Bearer ' + loginService.getToken()
                }
            }).then(function(resp) {
				post.upvotes++;
			})
		};

		svc.addComment = function(id, comment) {
			return $http.post('/posts/' + id + '/comments', comment, {
                headers: {
                    Authorization: 'Bearer ' + loginService.getToken()
                }
            });
		};

		svc.upvoteComment = function(post, comment) {
			return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: {
                    Authorization: 'Bearer ' + loginService.getToken()
                }
            }).then(function(resp) {
				comment.upvotes++;
			})
		}
	}

})();

