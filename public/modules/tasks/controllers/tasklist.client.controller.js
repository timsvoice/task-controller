'use strict';

angular.module('tasks').controller('TaskListController', ['$scope', '$stateParams', '$filter', '$location', 'Task', 'Tasklist', 'FoundationApi',
	function($scope, $stateParams, $filter, $location, Task, Tasklist, FoundationApi) {
    var tlVm = this,
        init,
        findTasklist,
        index;

    init = function init () {            
      Tasklist.findAllTasklists(function (tasklists) {
        tlVm.tasklists = tasklists;
        tlVm.tasklist = tlVm.tasklists[0];               
      }); 
    };
    init();

    tlVm.tasklistObj = {
      title: '',
      description: ''      
    }

    tlVm.taskObj = {
      title: '',
      description: '',
      important: false,
      urgent: false,
      time: 0,
      status: {
        timeAllocated: 0
      }
    };

    findTasklist = function findTasklist (tasklist) {
      Tasklist.findTasklist( tasklist._id, function (tasklist) {
        tlVm.tasklist = tasklist;
      }); 
    };    

    tlVm.createTasklist = function createTasklist (tasklist, userId) {
      Tasklist.createTasklist(tasklist, userId, function (response) {
        if (response.error) {
          alert('cannot create tasklist');
        } else {
          FoundationApi.closeActiveElements('create-tasklist-modal');                    
          tlVm.tasklists.push(response.object);
          console.log(tlVm.tasklists);
          
          tlVm.tasklistObj = {};
        }
      })
    }

    // TODO two step delete process
    tlVm.deleteTasklist = function deleteTasklist (tasklist, index) {
      Tasklist.deleteTasklist(tasklist, function (response) {
        if (response.err) { 
          alert('Cannot delete tasklist');          
        } else {
          tlVm.tasklists.splice(index, 1);
        }
      });
    }; 

    tlVm.setTasklist = function setTasklist (tasklist) {
      findTasklist(tasklist);     
    };

    tlVm.createTask = function createTask (tasklist, taskObj, userId) {      
      Task.createTask(taskObj, userId, function (taskResponse) {
        if (taskResponse.error) {
          console.log('cannot create task: ' + taskResponse.error);
        } else {
          tasklist.tasks.push(taskResponse.object._id);
          tasklist.$update(function(tasklistRes){
            findTasklist(tasklist);
            tlVm.taskObj = {
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

    tlVm.editTask = function editTask (task) {
      task.time =  $filter('timeMinutes')(task.status.timeAllocated);
      tlVm.editingTask = task;
    }

    tlVm.updateTask = function updateTask (task) {
      console.log(task);
      Task.updateTask(task, function (response) {
        if (response.error) {
          alert('cannot update task: ' + response.error)
        } else {
          console.log(response.object);
          FoundationApi.closeActiveElements('edit-task-modal'); 
        }
      })
    };

    // TODO two step delete process
    tlVm.deleteTask = function deleteTask (tasklist, task) {
      Task.deleteTask(task._id, function (response) {
        if (response.error) {
          alert('All the errors');
        } else {
          index = tlVm.tasklist.tasks.indexOf(task);
          tlVm.tasklist.tasks.splice(index, 1);
          tasklist.$update(function (tasklist) {
            tlVm.tasklist = tasklist;
          });
        }
      })
    };    

	}
]);