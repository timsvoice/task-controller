'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Tasklist = mongoose.model('Tasklist'),
	Task = mongoose.model('Task'),
	faker = require('faker'),
	moment = require('moment');

/**
 * Globals
 */
var user, tasklist, task, closeDeadline, farDeadline;

/**
 * Unit tests
 */
describe('Tasklist Model Unit Tests:', function() {
	beforeEach(function(done) {
		
		closeDeadline = moment().add(2, 'days').calendar();
		farDeadline = moment().add(12, 'days').calendar();

		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		task = new Task({
			title: faker.lorem.words(2),
			description: faker.lorem.sentence(2),
			deadline: closeDeadline,
			completed: false,
			timeAllocated: 1,
			important: true,
			urgent: false,
			timeSpent: 0,
			createdBy: user._id
		});

		user.save(function() { 
			tasklist = new Tasklist({
				tasks: [task._id],
				createdBy: user._id			
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return tasklist.save(function(err) {				
				should.not.exist(err);
				tasklist.tasks.length.should.eql(1);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Tasklist.remove().exec();
		User.remove().exec();

		done();
	});
});