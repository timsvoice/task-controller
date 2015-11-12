'use strict';

angular.module('tasks').factory('Task', ['$resource','Broadcast',
	function($resource, Broadcast) {
		var error,
				response,
				message,
				TaskResource,
				TaskService;

	  TaskResource = $resource('tasks/:taskId', { taskId: '@_id' }, 
      {
  			update: {
  				method: 'PUT'
  			}
		});

		TaskService = {
			createTask: function createTask (taskObj, userId, callback) {				
	      if (taskObj.time) {
	        taskObj.status.timeAllocated = (taskObj.time * 60);
	        delete taskObj.time;
	      };				
				var task = new TaskResource(taskObj);
				task.createdBy = userId;				
				task.$save(function (task) {
					message = {
						message: 'Task Created!',
						object: task,
						event: 'task.update'
					};					
					Broadcast(message);
					return callback(message);
				}, function (err) {
					return callback(err);
				});
			},			
			updateTask: function updateTask (taskObj, callback) {
	      if (taskObj.time) {
	        taskObj.status.timeAllocated = (taskObj.time * 60);
	        delete taskObj.time;
	      };				
				TaskResource.update({
					taskId: taskObj._id
				}, taskObj, function (task) {
					message = {
						message: 'Task Updated!',
						object: task,
						event: 'task.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					return callback(err);
				});
			},
			deleteTask: function deleteTask (taskId, callback) {
				TaskResource.delete({
					taskId: taskId
				}, function (task) {
					message = {
						message: 'Task Deleted',
						object: task,
						event: 'task.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					console.log(err);
					return callback(err);
				});
			},
			findTask: function findTask (taskId, callback) {
				TaskResource.get({
					taskId: taskId
				}, function (res) {
					return callback(res);
				}, function (err) {
					return callback(err);
				});
			},
			findAllTasks: function findAllTasks (callback) {
				TaskResource.query(function (res) {
					return callback(res);
				}, function (err) {
					console.log(err);
					return callback(err);
				});
			},
			completeTask: function completeTask (task, callback) {
				task.status.completed = true;
				TaskService.updateTask(task, function (response) {
					return callback(response);
				})
			}
		};

		return TaskService;
	}
]);