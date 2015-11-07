'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ikebox Schema
 */
var IkeboxSchema = new Schema({
  title: {
    type: String,
    required: 'Each Ikebox needs a title'
  },
  description: {
    type: String,
    required: 'Each Ikebox needs a short description'
  },
  tasks: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }],
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

mongoose.model('Ikebox', IkeboxSchema);