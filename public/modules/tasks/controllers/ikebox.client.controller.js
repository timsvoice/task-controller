'use strict';

angular.module('tasks').controller('IkeboxController', ['$scope', 'Task', 'FoundationApi', '$stateParams',
  function($scope, Task, FoundationApi, $stateParams) {
    var ibVm = this,
        init;

    init = function init () {
      Task.findTask( $stateParams.taskId, function (task) {
        ibVm.task = task;
        console.log(task);
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
    ibVm.deleteSubtask = function (taskObj, index) {
      ibVm.task.subTasks.splice(index, 1);
      Task.updateTask(ibVm.task, function (response) {
        if (response.err) { 
          alert('Cannot create subtask: ' + response.error);          
        } else {
        }
      });
    };

    ibVm.createSubtask = function (task, subtaskObj, userId) {
      Task.createTask(subtaskObj, userId, function (response) {
        if (response.err) { 
          alert('Cannot create subtask: ' + response.error);          
        } else {
          console.log(response);
          task.subTasks.push(response.object)
          Task.updateTask(task, function (response) {
            if (response.error) {
              alert('Failed to create task')
            } else {              
              FoundationApi.closeActiveElements('create-subtask-modal');
              ibVm.task = response.object;
            };
          })
        }
      });
    };

  }
]);