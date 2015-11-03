'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Task = mongoose.model('Task');

/**
 * Create a Task
 */
exports.createTask = function(req, res) {
  
  var task = new Task(req.body.task);

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);
    }
  });

};

/**
 * Show the current Task
 */
exports.findOneTask = function(req, res) {
  res.jsonp(req.task);
};

/**
 * Update a Task
 */
exports.updateTask = function(req, res) {
  var task = req.task;
  task = _.extend(task , req.body);

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);
    }
  });
};

/**
 * Delete an Task
 */
exports.deleteTask = function(req, res) {
  var task = req.task ;

  task.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);
    }
  });
};

/**
 * List of Tasks
 */
exports.findAllTasks = function(req, res) {
  Task.find({
    createdBy: req.body.user._id
  }).sort('-created').populate('subTasks').exec(function(err, tasks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tasks);
    }
  });
};

/**
 * task middleware
 */
exports.taskByID = function(req, res, next, id) { 
  Task.findById(id).populate('subTasks').exec(function(err, task) {
    if (err) return next(err);
    if (! task) return next(new Error('Failed to load task ' + id));
    req.task = task ;
    next();
  });
};

/**
 * task authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (String(req.body.user._id) !== String(req.task.createdBy)) {
   return res.status(403).send('User is not authorized');
  }
  next();
};