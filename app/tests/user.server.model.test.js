'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	faker = require('faker');

/**
 * Globals
 */
var userOne, userTwo;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		userOne = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			username: faker.internet.userName(),
			password: faker.internet.password(),
			provider: 'local'
		});
		userTwo = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: userOne.email,
			username: faker.internet.userName(),
			password: faker.internet.password(),
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			userOne.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			userOne.save();
			return userTwo.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			userOne.firstName = '';
			return userOne.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});