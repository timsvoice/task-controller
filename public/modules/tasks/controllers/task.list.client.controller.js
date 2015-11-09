'use strict';

angular.module('tasks').controller('TaskListController', ['$scope', 'Tasklist', 'FoundationApi',
	function($scope, Tasklist, FoundationApi) {
    var tlVm = this,
        init;

    init = function init () {
      Tasklist.findAllTasklists(function (tasklists) {
        tlVm.tasklists = tasklists;
      }); 
    };
    init();

    tlVm.tasklistObj = {
      title: '',
      description: ''      
    }

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

	}
]);