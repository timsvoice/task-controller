'use strict';

//Setting up route
angular.module('tasks').config(['$stateProvider',
	function($stateProvider) {
		// Tasks state routing
		$stateProvider.
		state('matrix', {
			url: '/matrix',
			templateUrl: 'modules/tasks/views/decision.matrix.client.view.html'
		}).
		state('tasklist', {
			url: '/tasklist',
			templateUrl: 'modules/tasks/views/tasklist.client.view.html'
		}).
		state('tasks', {
			url: '/tasks',
			templateUrl: 'modules/tasks/views/tasks.client.view.html'
		});
	}
]);