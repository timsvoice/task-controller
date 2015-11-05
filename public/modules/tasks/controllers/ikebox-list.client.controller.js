'use strict';

angular.module('tasks').controller('IkeboxListController', ['$scope', 'Task',
	function($scope, Task) {
    var ibVm = this,
        init;

    init = function init () {
      console.log('ikebox Controller');
    };
    init();


	}
]);