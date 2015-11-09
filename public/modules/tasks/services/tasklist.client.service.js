'use strict';

angular.module('tasks').factory('Tasklist', ['$resource', 'Broadcast',
	function($resource, Broadcast) {
		var error,
				response,
				message,
				TasklistResource,
				TasklistService;

	  TasklistResource = $resource('tasklists/:tasklistId', { tasklistId: '@_id' }, 
      {
  			update: {
  				method: 'PUT'
  			}
		});

		TasklistService = {
			createTasklist: function createTasklist (tasklistObj, userId, callback) {
				var tasklist = new TasklistResource(tasklistObj);
				tasklist.createdBy = userId;
				tasklist.$save(function (tasklist) {
					message = {
						message: 'Tasklist Created!',
						object: tasklist,
						event: 'tasklist.update'
					};
					Broadcast(message);
					return callback(message);
				}, function (err) {
					console.log(err);
					return callback(err);
				});
			},
			updateTasklist: function updateTasklist (tasklistObj, callback) {
				TasklistResource.update({
					tasklistId: tasklistObj._id
				}, tasklistObj, function (tasklist) {
					message = {
						message: 'Tasklist Updated!',
						object: tasklist,
						event: 'tasklist.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					return callback(err);
				});
			},
			deleteTasklist: function deleteTasklist (tasklistObj, callback) {
				console.log(tasklistObj._id);
				TasklistResource.delete({
					tasklistId: tasklistObj._id
				}, function (tasklist) {
					message = {
						message: 'Tasklist Deleted',
						object: tasklist,
						event: 'tasklist.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					console.log(err);
					return callback(err);
				});
			},
			findTasklist: function findTasklist (tasklistObj, callback) {
				TasklistResource.get({
					tasklistId: tasklistObj._id
				}, function (res) {
					return callback(res);
				}, function (err) {
					return callback(err);
				});
			},
			findAllTasklists: function findAllTasklists (callback) {
				TasklistResource.query(function (res) {
					return callback(res);
				}, function (err) {
					console.log(err);
					return callback(err);
				});
			}
		};

		return TasklistService;

	}
]);