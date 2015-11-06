'use strict';

angular.module('tasks').controller('DashboardController', ['Task', 'Authentication', 'FormlyForms', 'FoundationApi',
	function(Task, Authentication, FormlyForms, FoundationApi) {
    
    var dbVm = this,
        taskObj,
        init;
    
    init = function init () {
      dbVm.user = Authentication.user;
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

        

	}
]);