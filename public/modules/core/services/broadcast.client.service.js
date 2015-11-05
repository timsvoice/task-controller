'use strict';

angular.module('core').factory('Broadcast', ['$rootScope',
	function($rootScope) {
		
    var broadcastService;

		broadcastService = function broadcast (transmission) {
      var response = {
        message: transmission.message,
        object: transmission.object
      };
      $rootScope.$broadcast(transmission.event, {message: response.message});
      return response;
    };     
    return broadcastService;
	}
]);