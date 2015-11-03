'use strict';

angular.module('tasks').factory('Task', ['$resource',
	function($resource) {
		var error,
				response,
				TaskResource,
				service;

	  TaskResource = $resource('tasks/:taskId', { taskId: '@_id' }, 
      {
  			update: {
  				method: 'PUT'
  			}
		});

		service = {
			createTask: function createTask (taskObj, userId, callback) {
				var task = new TaskResource(taskObj);
				task.createdBy = userId;
				task.$save(function (task) {
					return callback(task);
				}, function (err) {
					return callback(err);
				});
			}
		};

		return service;
	}
]);