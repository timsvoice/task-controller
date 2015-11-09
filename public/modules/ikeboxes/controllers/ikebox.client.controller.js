'use strict';

angular.module('ikeboxes').controller('IkeboxController', ['$scope', 'Task', 'Ikebox', 'Tasklist', 'FoundationApi', '$stateParams',
  function($scope, Task, Ikebox, Tasklist, FoundationApi, $stateParams) {
    var ibVm = this,
        init;

    init = function init () {
      if ($stateParams.ikeboxId) {
        Ikebox.findIkebox( $stateParams.ikeboxId, function (ikebox) {
          ibVm.ikebox = ikebox;
        }); 
      } else if ($stateParams.tasklistId) {
        Ikebox.findAllIkeboxes(function (ikeboxes) {
          ibVm.ikeboxes = ikeboxes;
        })
      }
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
    // Ikebox Functions
    ////

    ibVm.findIkebox = function findIkebox (ikebox) {
      Ikebox.findIkebox( ikebox._id, function (ikebox) {
        ibVm.ikebox = ikebox;
      }); 
    }

    ibVm.deleteIkebox = function deleteIkebox (ikeboxId, index) {
      Ikebox.deleteIkebox(ikeboxId, function (response) {
        if (response.error) {
          alert('Cannot delete ikebox: ' + response.error)
        } else {
          ibVm.ikeboxes.splice(index, 1);
        }
      })
    }

    ibVm.createTask = function createTask (ikebox, taskObj, userId) {
      Task.createTask(taskObj, userId, function (taskResponse) {
        if (taskResponse.error) {
          alert('cannot create task: ' + taskResponse.error);
        } else {
          ikebox.tasks.push(taskResponse.object._id);
          ikebox.$update(function(ikeboxRes){
            ibVm.findIkebox(ikebox);
            FoundationApi.closeActiveElements('create-task-modal');          
          })
        }
      })
    }

    ibVm.updateTask = function updateTask (task) {
      Task.updateTask(task, function (response) {
        if (response.error) {
          alert('cannot update task: ' + response.error)
        } else {
          FoundationApi.closeActiveElements('edit-task-modal'); 
        }
      })
    }
   
    // TODO two step delete process
    ibVm.deleteTask = function deleteTask (ikebox, task, index) {
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