'use strict';

angular.module('tasks').filter('ikebox', [
	function() {
		return function(tasks, ikebox) {      
      var tasklist = [];
      
      tasks.forEach(function(task){
        if (task.isIkebox === ikebox) {
          tasklist.push(task);
        }
      });
      return tasklist;
      
		};
	}
]);