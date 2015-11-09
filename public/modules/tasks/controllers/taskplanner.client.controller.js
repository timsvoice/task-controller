'use strict';

angular.module('tasks').controller('TaskPlannerController', ['$scope', 'Tasklist', '$stateParams',
	function($scope, Tasklist, $stateParams) {
    var tpVm = this,
    init;

    init = function init () {
      Tasklist.findTasklist($stateParams.tasklistId, function (tasklist) {
        tpVm.tasklist = tasklist;
      })
    };
    init();

	}
]);