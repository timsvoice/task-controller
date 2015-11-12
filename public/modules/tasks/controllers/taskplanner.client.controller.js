'use strict';

angular.module('tasks').controller('TaskPlannerController', ['$scope', 'Task', 'Tasklist', 'Ikebox', '$stateParams',
	function($scope, Task, Tasklist, Ikebox, $stateParams) {
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
      var duplicate = false;
      tasklist.tasks.forEach(function (task) {
        if (task._id === taskId) {
          duplicate = true
        }
      });
      return duplicate;
    }

    tpVm.addToTasklist = function addToTasklist (taskId, tasklist) {
      if (checkDuplicate(tasklist, taskId) === false) {
        Tasklist.addToTasklist(taskId, tasklist, function (response) {
          if (response.error) {
            alert('all the errors');
          } else {
            getTasklist($stateParams.tasklistId);
          }
        })
      } else {
        alert('Task already in tasklist');
        console.log('Task already in tasklist');
      }
    };

    tpVm.removeFromTasklist = function removeFromTasklist (tasklist, index) {      
      tasklist.tasks.splice(index, 1);
      tasklist.$update(function (tasklist) {
        tpVm.tasklist = tasklist;
        console.log(tasklist);
      }, function (error) {
        alert('Failed')
      })
    };

    tpVm.completeTask = function completeTask (task) {
      Task.deleteTask(task._id, function (response) {
        if (response.error) {
          alert('All the errors');
        } else {
          ibVm.ikebox.tasks.splice(index, 1);
          ikebox.$update();
        }
      })      
    };

	}
]);