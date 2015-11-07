'use strict';

angular.module('tasks').directive('ikebox', [
	function() {
		return {
			templateUrl: './modules/tasks/views/ikebox.directive.client.view.html',
			restrict: 'E',
			controller: 'IkeboxController as ibVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);

