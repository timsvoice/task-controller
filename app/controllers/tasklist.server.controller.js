'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Tasklist = mongoose.model('Tasklist');

/**
 * Create a Tasklist
 */
exports.createTasklist = function(req, res) {
  
  var tasklist = new Tasklist(req.body.tasklist);

  tasklist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tasklist);
    }
  });

};

/**
 * Show the current Tasklist
 */
exports.findOneTasklist = function(req, res) {
  res.jsonp(req.tasklist);
};

/**
 * Update a Tasklist
 */
exports.updateTasklist = function(req, res) {
  var tasklist = req.tasklist;
  tasklist = _.extend(tasklist, req.body);

  tasklist.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tasklist);
    }
  });
};

/**
 * Delete an Tasklist
 */
exports.deleteTasklist = function(req, res) {
  var tasklist = req.body.tasklist ;

  tasklist.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tasklist);
    }
  });
};

/**
 * List of Tasklists
 */
exports.findAllTasklists = function(req, res) {
  Tasklist.find({
    createdBy: req.body.user._id
  }).sort('-created').exec(function(err, tasklists) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tasklists);
    }
  });
};

/**
 * tasklist middleware
 */
exports.tasklistByID = function(req, res, next, id) { 
  Tasklist.findById(id).exec(function(err, tasklist) {
    if (err) return next(err);
    if (! tasklist) return next(new Error('Failed to load tasklist ' + id));
    req.tasklist = tasklist;    
    next();
  });
};

/**
 * tasklist authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (String(req.body.user._id) !== String(req.tasklist.createdBy)) {
   return res.status(403).send('User is not authorized');
  }
  next();
};