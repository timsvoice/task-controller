'use strict';

//Setting up route
angular.module('tasks').config(['$stateProvider',
	function($stateProvider) {
		// Tasks state routing
		$stateProvider.
		state('dashboard.tasklists', {
			url: '/tasklists',
			templateUrl: 'modules/tasks/views/tasklist.client.view.html'
		}).
		state('dashboard.taskplanner', {
			url: '/taskplanner/:tasklistId',
			controller: 'TaskPlannerController as tpVm',
			templateUrl: 'modules/tasks/views/taskplanner.client.view.html'
		}).
		state('dashboard.taskrunner', {
			url: '/taskrunner/:tasklistId',
			controller: 'TaskRunnerController as trVm',
			templateUrl: 'modules/tasks/views/taskrunner.client.view.html'
		}).
		state('tasks', {
			url: '/tasks',
			templateUrl: 'modules/tasks/views/tasks.client.view.html'
		});
	}
]);