'use strict';

angular.module('tasks').filter('priority', function () {
		
    var taskMatrix;
    
    return function(tasks, important, urgent) {
      taskMatrix = [];
      console.log(tasks);
      tasks.forEach(function (task) {
        if (task.important === important && task.urgent === urgent) {
          taskMatrix.push(task);
        }
      });
      return taskMatrix;
		};
	}
);