'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  agent = request.agent(app),
  faker = require('faker'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Task = mongoose.model('Task'),
  moment = require('moment');

/**
 * Globals
 */
var user, credentials, task, closeDeadline, farDeadline, savedUser;

/**
 * Unit tests
 */
describe('Task Route Tests:', function() {
	beforeEach(function(done) {
		
		user = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		done();

	});

	describe('User Signup', function() {
		it('should be able to signup user without problems', function(done) {
			agent.post('/auth/signup')
				.send(user)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);		
					console.log(signinRes);
          done();
		     });
		});
	});

	afterEach(function(done) { 
		User.remove().exec();		
		done();
	});
});