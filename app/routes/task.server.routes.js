'use strict';

module.exports = function(app) {
  var tasks = require('../../app/controllers/task.server.controller')
  var users = require('../../app/controllers/users.server.controller');
  
  app.route('/tasks')
    .get(users.requiresLogin, tasks.findAllTasks)
    .post(users.requiresLogin, tasks.createTask)
  
  app.route('/tasks/:taskId')
    .get(users.requiresLogin, tasks.findOneTask)
    .put(users.requiresLogin, tasks.updateTask)
    .delete(users.requiresLogin, tasks.deleteTask)

  // ID middleware
  app.param('taskId', tasks.taskByID);
};