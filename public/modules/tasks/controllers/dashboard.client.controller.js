'use strict';

angular.module('tasks').controller('DashboardController', ['Task', 'Authentication', 'FormlyForms', 'FoundationApi',
	function(Task, Authentication, FormlyForms, FoundationApi) {
    
    var dbVm = this,
        taskObj,
        init;
    
    init = function init () {
      dbVm.user = Authentication.user;
      Task.findAllTasks(function (tasks) {
        console.log(tasks[0]);
        if (tasks[0]) {
          dbVm.tasks = tasks
        } else {
          dbVm.tasks = [{
            title: 'Sample Ikebox',
            description: 'Just a sample',
            isIkebox: true
          }]
        }
      }); 
    };
    init();

    ////
    // Task Forms
    ////

    // Form Models

    dbVm.taskObj = {
      title: '',
      description: '',
      important: false,
      urgent: false
    };

    // Formly Forms

  dbVm.fields = [
    {
      type: 'input'
    }
  ];

    dbVm.createTask = FormlyForms.createTask(dbVm.taskObj);

    

    ////
    // Task Functions
    ////

    dbVm.createIkebox = function (task) {
      task.isIkebox = true;
      Task.createTask(task, dbVm.user._id ,function (response) {
        if (response.err) { 
          console.log(response.err) 
        } else {
          FoundationApi.closeActiveElements('create-task-modal');
          dbVm.tasks.push(response.object);
          dbVm.taskObj = {};
        }               
      });
    };

    dbVm.completeTask = function (task) {
      task.status.complete = true;
      Task.updateTask(task, function (response) {
        if (response.err) { console.log(response.err) }
        alert(response);
      });
    };

    dbVm.deleteTask = function (task, index) {
      Task.deleteTask(task, function (response) {
        if (response.err) { 
          console.log(response.err) 
        } else {
          dbVm.tasks.splice(index, 1);
        }
      });
    };
    

	}
]);