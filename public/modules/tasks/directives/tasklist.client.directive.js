'use strict';

angular.module('tasks').directive('tasklist', [
	function() {
		return {
			templateUrl: './modules/tasks/views/tasklist.directive.client.view.html',
			restrict: 'E',
			controller: 'TaskListController as tlVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);