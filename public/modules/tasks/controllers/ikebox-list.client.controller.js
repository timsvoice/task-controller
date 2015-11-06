'use strict';

angular.module('tasks').controller('IkeboxListController', ['$scope', 'Task', 'FoundationApi',
	function($scope, Task, FoundationApi) {
    var ibVm = this,
        init;

    init = function init () {
      Task.findAllTasks(function (tasks) {
          ibVm.tasks = tasks
      }); 
    };
    init();

    // Form Models

    ibVm.taskObj = {
      title: '',
      description: '',
      important: false,
      urgent: false
    };

    ////
    // Task Functions
    ////

    ibVm.createIkebox = function (task, userId) {
      task.isIkebox = true;
      Task.createTask(task, userId, function (response) {
        if (response.err) { 
          alert('Cannot save ikebox');
        } else {
          FoundationApi.closeActiveElements('create-task-modal');          
          ibVm.tasks.push(response.object);
          ibVm.taskObj = {};
        }               
      });
    };

    // TODO two step delete process
    ibVm.deleteIkebox = function (task, index) {
      Task.deleteTask(task, function (response) {
        if (response.err) { 
          alert('Cannot delete ikebox');          
        } else {
          ibVm.tasks.splice(index, 1);
        }
      });
    };

	}
]);