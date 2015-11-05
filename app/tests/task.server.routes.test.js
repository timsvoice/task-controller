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
var user, credentials, task, closeDeadline, farDeadline;

/**
 * Unit tests
 */
describe('Task Route Tests:', function() {
	beforeEach(function(done) {
		
		closeDeadline = moment().add(2, 'days').calendar();
		farDeadline = moment().add(12, 'days').calendar();

		user = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			username: faker.internet.userName(),
			password: faker.internet.password(),
			provider: 'local'
		});

		credentials = {
			email: user.email,
			password: user.password
		};

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

	describe('Method Post', function() {
		it('should be able to post task without problems', function(done) {
			agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);		
			    agent.post('/tasks')
			      .expect(200)
			      .send(task)
			      .end(function(taskErr, taskRes) {

			        taskRes.body.should.be.an.Object.with.property('title', task.title);

			        done();
			      });
		     });
		});
	});

	describe('Method Get', function() {
		beforeEach(function (done) {			
			task.save(done);
		});
		it('should be able to get a list of tasks without problems', function(done) {
			agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);
			    agent.get('/tasks')
			      .expect(200)
			      .end(function(taskErr, taskRes) {
			        
			        if (taskErr) console.log(taskErr);
			        
			        taskRes.body.should.be.an.Array.with.length(1);

			        done();
			      });
				});
		});
		it('should be able to get a single task without problems', function(done) {
	    agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);
			    agent.get('/tasks/' + task._id)
			      .expect(200)
			      .end(function(taskErr, taskRes) {
			        
			        if (taskErr) console.log(taskErr);
			        
			        taskRes.body.should.be.an.Object.with.property('title', task.title);

			        done();
			      });
			  });
		});		
	});

	describe('Method Put', function() {
		beforeEach(function (done) {			
			task.save(done);
		});
		it('should be able to update task without problems', function(done) {
	    task.title = 'New Title';
	    agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);
			    agent.put('/tasks/' + task._id)
			      .expect(200)
			      .send(task)
			      .end(function(taskErr, taskRes) {
			        
			        if (taskErr) console.log(taskErr);
			        
			        taskRes.body.should.be.an.Object.with.property('title', 'New Title');

			        done();
			      });
			  });
		});
	});

	afterEach(function(done) { 
		Task.remove().exec();
		User.remove().exec();
		
		done();
	});
});