'use strict';

module.exports = function(app) {
  var tasklists = require('../../app/controllers/tasklist.server.controller')
  var users = require('../../app/controllers/users.server.controller');
  
  app.route('/tasklists')
    .get(users.requiresLogin, tasklists.findAllTasklists)
    .post(users.requiresLogin, tasklists.createTasklist)
  
  app.route('/tasklists/:tasklistId')
    .get(users.requiresLogin, tasklists.findOneTasklist)
    .put(users.requiresLogin, tasklists.updateTasklist)
    .delete(users.requiresLogin, tasklists.deleteTasklist)

  // ID middleware
  app.param('tasklistId', tasklists.tasklistByID);
};