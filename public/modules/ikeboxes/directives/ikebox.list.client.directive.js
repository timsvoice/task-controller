'use strict';

angular.module('ikeboxes').directive('ikeboxList', [
	function() {
		return {
			templateUrl: './modules/ikeboxes/views/ikebox.list.directive.client.view.html',
			restrict: 'E',
			controller: 'IkeboxListController as iblVm',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);