'use strict';

angular.module('tasks').factory('Task', ['$resource', '$rootScope', 'Broadcast',
	function($resource, $rootScope, Broadcast) {
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
				var task = new TaskResource(taskObj);
				task.createdBy = userId;
				task.$save(function (task) {
					message = {
						message: 'Task Created!',
						object: task,
						event: 'task.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					return callback(err);
				});
			},
			updateTask: function updateTask (taskObj, callback) {
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
			deleteTask: function deleteTask (taskObj, callback) {
				TaskResource.delete({
					taskId: taskObj._id
				}, function (task) {
					message = {
						message: 'Task Deleted',
						object: task,
						event: 'task.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					return callback(err);
				})
			},
			findTask: function findTask (taskObj, callback) {
				TaskResource.get({
					taskId: taskObj._id
				}, function (res) {
					return callback(res);
				}, function (res) {
					return callback(err);
				})
			},
			findAllTasks: function findAllTasks (taskObj, callback) {
				TaskResource.query(function (res) {
					return callback(res);
				}, function (err) {
					return callback(err);
				})
			}
		};

		return TaskService;
	}
]);