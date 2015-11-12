'use strict';

angular.module('ikeboxes').controller('IkeboxController', ['$scope', '$filter', 'Task', 'Ikebox', 'Tasklist', 'FoundationApi', '$stateParams',
  function($scope, $filter, Task, Ikebox, Tasklist, FoundationApi, $stateParams) {
    var ibVm = this,
        init,
        index;

    init = function init () {
      if ($stateParams.ikeboxId) {
        Ikebox.findIkebox( $stateParams.ikeboxId, function (ikebox) {
          ibVm.ikebox = ikebox;
          ibVm.ikebox.tasks.forEach(function (task) {
            task.time = $filter('timeMinutes')(task.status.timeAllocated);
          });
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
      urgent: false,
      time: 0,
      status: {
        timeAllocated: 0
      }
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
          console.log('cannot create task: ' + taskResponse.error);
        } else {
          ikebox.tasks.push(taskResponse.object._id);
          ikebox.$update(function(ikeboxRes){
            ibVm.findIkebox(ikebox);
            ibVm.taskObj = {
              title: '',
              description: '',
              important: false,
              urgent: false,
              time: 0,
              status: {
                timeAllocated: 0
              }
            };
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
          console.log(response.object);
          FoundationApi.closeActiveElements('edit-task-modal'); 
        }
      })
    };

    ibVm.completeTask = function completeTask (task) {
      Task.completeTask(task, function (response) {
        if (response.error) {
          console.log(response.error)
        } else {
          console.log(response.object);
        }          
      }); 
    };
   
    // TODO two step delete process
    ibVm.deleteTask = function deleteTask (ikebox, task) {
      Task.deleteTask(task._id, function (response) {
        if (response.error) {
          alert('All the errors');
        } else {
          index = ibVm.ikebox.tasks.indexOf(task);
          ibVm.ikebox.tasks.splice(index, 1);
          ikebox.$update(function (ikebox) {
            ibVm.ikebox = ikebox;
          });
        }
      })
    };

  }
]);