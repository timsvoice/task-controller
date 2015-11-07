'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ikebox = mongoose.model('Ikebox'),
	faker = require('faker'),
	moment = require('moment');

/**
 * Globals
 */
var user, ikebox;

/**
 * Unit tests
 */
describe('ikebox Model Unit Tests:', function() {
	beforeEach(function(done) {
		
		user = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			username: faker.internet.userName(),
			password: faker.internet.password()
		});

		user.save(function() { 
			ikebox = new Ikebox({
				title: faker.lorem.words(2),
				description: faker.lorem.sentence(2),			
				createdBy: user._id
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return ikebox.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
		it('should not save without a title', function(done) {
			ikebox.title = '';
			return ikebox.save(function(err){
				should.exist(err);
				done();
			});
		});
		it('should not save without a description', function(done) {
			ikebox.description = '';
			return ikebox.save(function(err){
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Ikebox.remove().exec();
		User.remove().exec();
		
		done();
	});
});