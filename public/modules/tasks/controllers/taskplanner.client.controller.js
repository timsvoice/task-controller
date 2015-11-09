'use strict';

angular.module('tasks').controller('TaskPlannerController', ['$scope', 'Tasklist', 'Ikebox', '$stateParams',
	function($scope, Tasklist, Ikebox, $stateParams) {
    var tpVm = this,
    init,
    getTasklist,
    checkDuplicate;

    init = function init () {
      Tasklist.findTasklist($stateParams.tasklistId, function (tasklist) {
        tpVm.tasklist = tasklist;
      })
      Ikebox.findAllIkeboxes(function (ikeboxes) {
        tpVm.ikeboxes = ikeboxes;
      })      
    };
    init();

    getTasklist = function getTasklist (tasklistId) {
      Tasklist.findTasklist(tasklistId, function (tasklist) {
        tpVm.tasklist = tasklist;
      })      
    }

    checkDuplicate = function checkDuplicate (tasklist, taskId) {
      tasklist.tasks.forEach(function (task) {
        if (task._id === taskId) {
          return true;
        } else {
          return false;
        }
      })
    }

    tpVm.addToTasklist = function addToTasklist (taskId, tasklist) {
      if (checkDuplicate(tasklist, taskId) === false) {
        Tasklist.addToTasklist(taskId, tasklist, function (response) {
          if (response.error) {
            alert('all the errors');
            console.log(response.error);
          } else {
            getTasklist($stateParams.tasklistId);
          }
        })
      } else {
        alert('Task already in tasklist');
        console.log('Task already in tasklist');
      }
    };

	}
]);