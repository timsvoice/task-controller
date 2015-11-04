'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		if (!window.user) {
			$urlRouterProvider.when('/', function ($injector, $location, $state) {
				$state.go('home');
			})
		};
		
		// Route user to dashboard if logged in		
		if (window.user) {
			$urlRouterProvider.when('/', function ($injector, $location, $state) {
				$state.go('dashboard')
			})
		};

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);