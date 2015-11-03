'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tasks Schema
 */
var TaskSchema = new Schema({
  title: {
    type: String,
    required: 'Each task needs a title'
  },
  description: {
    type: String,
    required: 'Each task needs a short description'
  },
  deadline: {
    type: String,    
  },
  completed: {
    type: Boolean,
    default: false
  },
  timeAllocated: {
    type: Number,
    default: 1
  },
  important: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  },
  subTasks: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }],
  timeSpent: {
    type: Number,
    default: 0
  }
});

mongoose.model('Task', TaskSchema);