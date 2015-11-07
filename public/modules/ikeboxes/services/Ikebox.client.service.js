'use strict';

angular.module('ikeboxes').factory('Ikebox', ['$resource','Broadcast',
	function($resource, Broadcast) {
		var error,
				response,
				message,
				IkeboxResource,
				IkeboxService;

	  IkeboxResource = $resource('ikeboxes/:ikeboxId', { ikeboxId: '@_id' }, 
      {
  			update: {
  				method: 'PUT'
  			}
		});

		IkeboxService = {
			createIkebox: function createIkebox (ikeboxObj, userId, callback) {
				var ikebox = new IkeboxResource(ikeboxObj);
				ikebox.createdBy = userId;
				ikebox.$save(function (ikebox) {
					message = {
						message: 'ikebox Created!',
						object: ikebox,
						event: 'ikebox.update'
					};					
					Broadcast(message);
					return callback(message);
				}, function (err) {
					return callback(err);
				});
			},			
			updateIkebox: function updateIkebox (ikeboxObj, callback) {
				IkeboxResource.update({
					ikeboxId: ikeboxObj._id
				}, ikeboxObj, function (ikebox) {
					message = {
						message: 'ikebox Updated!',
						object: ikebox,
						event: 'ikebox.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					return callback(err);
				});
			},
			deleteIkebox: function deleteIkebox (ikeboxId, callback) {
				IkeboxResource.delete({
					ikeboxId: ikeboxId
				}, function (ikebox) {
					message = {
						message: 'ikebox Deleted',
						object: ikebox,
						event: 'ikebox.update'
					}
					Broadcast(message);
					return callback(message);
				}, function (err) {
					console.log(err);
					return callback(err);
				});
			},
			findIkebox: function findikebox (ikeboxId, callback) {
				IkeboxResource.get({
					ikeboxId: ikeboxId
				}, function (res) {
					return callback(res);
				}, function (err) {
					return callback(err);
				});
			},
			findAllIkeboxes: function findAllikeboxes (callback) {
				IkeboxResource.query(function (res) {
					return callback(res);
				}, function (err) {
					console.log(err);
					return callback(err);
				});
			}
		};

		return IkeboxService;
	}
]);