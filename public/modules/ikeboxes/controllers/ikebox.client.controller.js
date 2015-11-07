'use strict';

angular.module('ikeboxes').controller('IkeboxController', ['$scope', 'Task', 'Ikebox', 'FoundationApi', '$stateParams',
  function($scope, Task, Ikebox, FoundationApi, $stateParams) {
    var ibVm = this,
        init;

    init = function init () {
      Ikebox.findIkebox( $stateParams.ikeboxId, function (ikebox) {
        ibVm.ikebox = ikebox;
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

    ibVm.editTask = function editTask (task) {
      Task.editTask(task, function (response) {
        if (response.error) {
          alert('cannot update task: ' + response.error)
        } else {

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