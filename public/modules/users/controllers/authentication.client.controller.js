'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		
		var authVm = this;

		authVm.authentication = Authentication;

		// If user is signed in then redirect back home
		if (authVm.authentication.user) $location.path('/');

		authVm.signup = function(credentials) {
			$http.post('/auth/signup', credentials).success(function(response) {
				// If successful we assign the response to the global user model
				authVm.authentication.user = response;
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				authVm.error = response.message;
			});
		};

		authVm.signin = function(credentials) {
			$http.post('/auth/signin', credentials).success(function(response) {
				// If successful we assign the response to the global user model
				authVm.authentication.user = response;
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				authVm.error = response.message;
			});
		};
	}
]);