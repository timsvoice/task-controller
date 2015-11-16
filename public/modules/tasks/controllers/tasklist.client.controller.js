'use strict';

angular.module('tasks').controller('TaskListController', ['$scope', '$stateParams', '$location', 'Task', 'Tasklist', 'FoundationApi',
	function($scope, $stateParams, $location, Task, Tasklist, FoundationApi) {
    var tlVm = this,
        init,
        findTasklist;

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

	}
]);