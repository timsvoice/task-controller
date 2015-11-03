'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Task = mongoose.model('Task'),
	faker = require('faker'),
	moment = require('moment');

/**
 * Globals
 */
var user, task, closeDeadline, farDeadline;

/**
 * Unit tests
 */
describe('Task Model Unit Tests:', function() {
	beforeEach(function(done) {
		
		closeDeadline = moment().add(2, 'days').calendar();
		farDeadline = moment().add(12, 'days').calendar();

		user = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			username: faker.internet.userName(),
			password: faker.internet.password()
		});

		user.save(function() { 
			task = new Task({
				title: faker.lorem.words(2),
				description: faker.lorem.sentence(2),
				deadline: closeDeadline,
				status: {
					started: true,
					completed: false,
					timeAllocated: moment().minute(30),
					timeSpent: moment().minute(25),
				},		
				important: true,
				urgent: false,				
				createdBy: user._id
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return task.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
		it('should not save without a title', function(done) {
			task.title = '';
			return task.save(function(err){
				should.exist(err)
				done();
			})
		});
		it('should not save without a description', function(done) {
			task.description = '';
			return task.save(function(err){
				should.exist(err)
				done();
			})
		});
	});

	afterEach(function(done) { 
		Task.remove().exec();
		User.remove().exec();
		
		done();
	});
});