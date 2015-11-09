'use strict';

angular.module('ikeboxes').directive('ikeboxPlanner', [
	function() {
		return {
			templateUrl: './modules/ikeboxes/views/ikeboxplanner.directive.client.view.html',
			restrict: 'E',
			controller: 'IkeboxController as ibVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);