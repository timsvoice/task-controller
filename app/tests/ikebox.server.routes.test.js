'use strict';

var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  agent = request.agent(app),
  faker = require('faker'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ikebox = mongoose.model('Ikebox'),
  moment = require('moment');

/**
 * Globals
 */
var user, credentials, ikebox, closeDeadline, farDeadline;

/**
 * Unit tests
 */
describe('ikebox Route Tests:', function() {
  beforeEach(function(done) {
    
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
      ikebox = new Ikebox({
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(2),      
        createdBy: user._id
      });
      done();
    });
  });

  describe('Method Post', function() {
    it('should be able to post ikebox without problems', function(done) {
      agent.post('/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          if (signinErr) done(signinErr);   
          agent.post('/ikeboxes')
            .expect(200)
            .send(ikebox)
            .end(function(ikeboxErr, ikeboxRes) {

              ikeboxRes.body.should.be.an.Object.with.property('title', ikebox.title);

              done();
            });
         });
    });
  });

  describe('Method Get', function() {
    beforeEach(function (done) {      
      ikebox.save(done);
    });
    it('should be able to get a list of ikeboxes without problems', function(done) {
      agent.post('/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          if (signinErr) done(signinErr);
          agent.get('/ikeboxes')
            .expect(200)
            .end(function(ikeboxErr, ikeboxRes) {
              
              if (ikeboxErr) console.log(ikeboxErr);
              
              ikeboxRes.body.should.be.an.Array.with.length(1);

              done();
            });
        });
    });
    it('should be able to get a single ikebox without problems', function(done) {
      agent.post('/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          if (signinErr) done(signinErr);
          agent.get('/ikeboxes/' + ikebox._id)
            .expect(200)
            .end(function(ikeboxErr, ikeboxRes) {
              
              if (ikeboxErr) console.log(ikeboxErr);
              
              ikeboxRes.body.should.be.an.Object.with.property('title', ikebox.title);

              done();
            });
        });
    });   
  });

  describe('Method Put', function() {
    beforeEach(function (done) {      
      ikebox.save(done);
    });
    it('should be able to update ikebox without problems', function(done) {
      ikebox.title = 'New Title';
      agent.post('/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          if (signinErr) done(signinErr);
          agent.put('/ikeboxes/' + ikebox._id)
            .expect(200)
            .send(ikebox)
            .end(function(ikeboxErr, ikeboxRes) {
              
              if (ikeboxErr) console.log(ikeboxErr);
              
              ikeboxRes.body.should.be.an.Object.with.property('title', 'New Title');

              done();
            });
        });
    });
  });

  afterEach(function(done) { 
    Ikebox.remove().exec();
    User.remove().exec();
    
    done();
  });
});