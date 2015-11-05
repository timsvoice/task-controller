'use strict';

angular.module('tasks').directive('ikeboxList', [
	function() {
		return {
			templateUrl: './modules/tasks/views/ikebox.list.client.view.html',
			restrict: 'E',
			controller: 'IkeboxListController as ibVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);