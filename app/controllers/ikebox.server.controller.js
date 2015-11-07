'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),    
    _ = require('lodash'),
    Ikebox = mongoose.model('Ikebox');

/**
 * Create a ikebox
 */
exports.createIkebox = function(req, res) {  
  var ikebox = new Ikebox(req.body);
  ikebox.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ikebox);
    }
  });

};

/**
 * Show the current ikebox
 */
exports.findOneIkebox = function(req, res) {
  res.jsonp(req.ikebox);
};

/**
 * Update a ikebox
 */
exports.updateIkebox = function(req, res) {
  var ikebox = req.ikebox;
  ikebox = _.extend(ikebox , req.body);

  ikebox.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ikebox);
    }
  });
};

/**
 * Delete a ikebox
 */
exports.deleteIkebox = function(req, res) {
  var ikebox = req.ikebox ;

  ikebox.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ikebox);
    }
  });
};

/**
 * List of ikeboxs
 */
exports.findAllIkeboxes = function(req, res) {
  Ikebox.find({
    createdBy: req.user._id
  }).sort('-created').populate('tasks').exec(function(err, ikeboxs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ikeboxs);
    }
  });
};

/**
 * ikebox middleware
 */
exports.ikeboxByID = function(req, res, next, id) { 
  Ikebox.findById(id).populate('tasks').exec(function(err, ikebox) {
    if (err) return next(err);
    if (! ikebox) return next(new Error('Failed to load ikebox ' + id));
    req.ikebox = ikebox ;
    next();
  });
};

/**
 * ikebox authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (String(req.body.user._id) !== String(req.ikebox.createdBy)) {
   return res.status(403).send('User is not authorized');
  }
  next();
};