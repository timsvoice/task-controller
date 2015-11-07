'use strict';

angular.module('tasks').controller('IkeboxController', ['$scope', 'Task', 'FoundationApi', '$stateParams',
  function($scope, Task, FoundationApi, $stateParams) {
    var ibVm = this,
        init;

    init = function init () {
      Task.findTask( $stateParams.taskId, function (task) {
        ibVm.task = task;
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

    // TODO two step delete process
    ibVm.deleteSubtask = function (taskId, index) {
      Task.deleteTask(taskId, function (response) {
        if (response.err) { 
          alert('Cannot delete ikebox');          
        } else {
          ibVm.task.subTasks.splice(index, 1);
        }
      });
    };

    ibVm.createSubtask = function (task, subtaskObj, userId) {
      Task.createSubtask(task, subtaskObj, userId, function (response) {
        if (response.err) { 
          alert('Cannot create subtask: ' + response.error);          
        } else {
          console.log(response);  
          ibVm.task.subTasks.push(response.object);
          FoundationApi.closeActiveElements('create-subtask-modal');
        }
      });
    };

  }
]);