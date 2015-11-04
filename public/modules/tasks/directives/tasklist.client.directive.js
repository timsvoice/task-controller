'use strict';

angular.module('tasks').directive('tasklist', [
	function() {
		return {
			templateUrl: './public/modules/tasks/views/tasklist.client.view.html',
			restrict: 'E',
			scope: {},
			controller: 'tasklistController as tlVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);