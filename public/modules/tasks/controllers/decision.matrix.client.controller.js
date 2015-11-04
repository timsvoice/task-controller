'use strict';

angular.module('tasks').controller('DecisionMatrixController', ['Task', 'Authentication', 'FormlyForms',
	function(Task, Authentication, FormlyForms) {
    
    var dmVm = this,
        init;
    
    init = function init () {
      dmVm.user = Authentication.user;
      Task.findAllTasks(function (tasks) {
        dmVm.tasks = tasks;
      }) 
    }
    init();

    ////
    // Task Forms
    ////

    // Form Models

    dmVm.taskObj = {
      title: '',
      description: '',
      deadline: Date.now(),      
      status: {
        important: false,
        urgent: false
      }
    };

    // Formly Forms

    FormlyForms.createTask(dmVm.taskObj)

    ////
    // Task Functions
    ////

    dmVm.completeTask = function (task) {
      task.status.complete = true;
      Task.updateTask(task, function (response) {
        if (response.err === true) { throw response.err };
        alert(response);
      })
    };

    dmVm.deleteTask = function (task) {
      Task.deleteTask(task, function (response) {
        if (response.err === true) { throw response.err };
        alert(response);
      })
    };
    

	}
]);