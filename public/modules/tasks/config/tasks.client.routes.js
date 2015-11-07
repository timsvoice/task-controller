'use strict';

//Setting up route
angular.module('tasks').config(['$stateProvider',
	function($stateProvider) {
		// Tasks state routing
		$stateProvider.
		state('dashboard.tasklist', {
			url: '/tasklists',
			controller: 'TaskListController as dbVm',
			templateUrl: 'modules/tasks/views/tasklist.client.view.html'
		}).
		state('tasks', {
			url: '/tasks',
			templateUrl: 'modules/tasks/views/tasks.client.view.html'
		});
	}
]);