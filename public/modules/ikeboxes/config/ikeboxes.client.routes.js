'use strict';

//Setting up route
angular.module('ikeboxes').config(['$stateProvider',
	function($stateProvider) {
		// ikeboxes state routing
		$stateProvider.
		state('dashboard.ikeboxes', {
			url: '/ikeboxes',
			templateUrl: 'modules/ikeboxes/views/ikebox.list.client.view.html'
		}).	
		state('dashboard.ikebox', {
			url: '/ikeboxes/:ikeboxId',
			templateUrl: 'modules/ikeboxes/views/ikebox.client.view.html'
		})
	}
]);