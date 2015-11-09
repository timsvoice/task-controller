'use strict';

angular.module('tasks').directive('taskPlanner', [
	function() {
		return {
			templateUrl: './modules/tasks/views/tasklist.planner.directive.client.view.html',
			restrict: 'E',
			controller: 'TaskPlannerController as tlVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);