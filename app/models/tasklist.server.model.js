'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tasklist Schema
 */
var TasklistSchema = new Schema({
	tasks: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }],
  date: {
    type: String,
    default: Date.now()
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

mongoose.model('Tasklist', TasklistSchema);