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
  status: {
    started: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    timeAllocated: {
      type: Number,
      default: 0,
      required: 'Task must have a time budget' 
    },
    timeSpent: {
      type: Number,
      default: 0,
    }   
  },
  important: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  },
  isIkebox: {
    type: Boolean,
    default: false
  },
  subTasks: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }],
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

mongoose.model('Task', TaskSchema);