'use strict';

module.exports = function(app) {
  var ikeboxes = require('../../app/controllers/ikebox.server.controller');
  var users = require('../../app/controllers/users.server.controller');
  
  app.route('/ikeboxes')
    .get(users.requiresLogin, ikeboxes.findAllIkeboxes)
    .post(users.requiresLogin, ikeboxes.createIkebox);
  
  app.route('/ikeboxes/:ikeboxId')
    .get(users.requiresLogin, ikeboxes.findOneIkebox)
    .put(users.requiresLogin, ikeboxes.updateIkebox)
    .delete(users.requiresLogin, ikeboxes.deleteIkebox);

  // ID middleware
  app.param('ikeboxId', ikeboxes.ikeboxByID);
};