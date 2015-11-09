'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  agent = request.agent(app),
  faker = require('faker'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Task = mongoose.model('Task'),
  Tasklist = mongoose.model('Tasklist'),
  moment = require('moment');

/**
 * Globals
 */
var user, credentials, task, tasklist, closeDeadline, farDeadline;

/**
 * Unit tests
 */
describe('Tasklist Route Tests:', function() {
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

		user.save(function() { 
			tasklist = new Tasklist({
				title: faker.lorem.words(2),
				description: faker.lorem.sentence(2),				
				tasks: [task._id],
				createdBy: user._id
			});
			done();
		});
	});

	describe('Method Post', function() {
		it('should be able to post tasklist without problems', function(done) {
			agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);		
			    agent.post('/tasklists')
			      .expect(200)
			      .send(tasklist)
			      .end(function(tasklistErr, tasklistRes) {
			        
			        if (tasklistErr) console.log(tasklistErr);
			        
			        tasklistRes.body.tasks.should.be.an.Array.with.length(1);

			        done();
			      });
		     });
		});
	});

	describe('Method Get', function() {
		beforeEach(function (done) {			
			tasklist.save(done);
		});
		it('should be able to get a list of tasklists without problems', function(done) {
			agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);
			    agent.get('/tasklists')
			      .expect(200)
			      .end(function(tasklistErr, tasklistRes) {
			        
			        if (tasklistErr) console.log(tasklistErr);

			        tasklistRes.body.should.be.an.Array.with.length(1);

			        done();
			      });
				});
		});
		it('should be able to get a single tasklist without problems', function(done) {
	    agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {
					if (signinErr) done(signinErr);
			    agent.get('/tasklists/' + tasklist._id)
			      .expect(200)
			      .send({user: user})
			      .end(function(tasklistErr, tasklistRes) {
			        
			        if (tasklistErr) console.log(tasklistErr);
			        
			        tasklistRes.body.should.be.an.Object.with.property('tasks', [task._id.toString()]);

			        done();
			      });
			  });
		});		
	});

	describe('Method Put', function() {
		beforeEach(function (done) {			
			tasklist.save(done);
		});
		it('should be able to post tasklist without problems', function(done) {
	    tasklist.tasks = [];
	    agent.post('/auth/signin')
				.send(credentials)
				.expect(200)
				.end(function (signinErr, signinRes) {					
					if (signinErr) done(signinErr);
			    agent.put('/tasklists/' + tasklist._id)
			      .expect(200)
			      .send(tasklist)
			      .end(function(tasklistErr, tasklistRes) {

			        if (tasklistErr) console.log(tasklistErr);
			        
			        tasklistRes.body.tasks.should.be.an.Array.with.length(0);

			        done();
			      });
			  });
		});
	});

	afterEach(function(done) { 
		Tasklist.remove().exec();
		User.remove().exec();
		
		done();
	});
});