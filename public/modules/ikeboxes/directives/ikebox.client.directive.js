'use strict';

angular.module('ikeboxes').directive('ikebox', [
	function() {
		return {
			templateUrl: './modules/ikeboxes/views/ikebox.directive.client.view.html',
			restrict: 'E',
			controller: 'IkeboxController as ibVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);

