'use strict';

(function() {
  // Followers Service Spec
  describe('Followers Service Tests', function() {
    // Initialize global variables
    var Tasklist,
        Users,
        scope,
        $httpBackend,
        $stateParams,
        $location,
        user,
        tasklist,
        tasklistResponse,
        sampleTasklist,
        sampleTasklistResponse,
        userResponse,
        date;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function() {
      jasmine.addMatchers({
        toEqualData: function(util, customEqualityTesters) {
          return {
            compare: function(actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Tasklist_, _Users_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Tasklist = _Tasklist_;
      Users = _Users_;

    }));

    beforeEach(function(){
      date = new Date();
      // set user
      user = {
        _id: '525cf20451979dea2c000001',
        firstName: 'faker.name.firstName()',
        lastName: 'faker.name.lastName()',
        email: 'user@mail.com',
        username: 'faker.internet.userName()',
        password: 'password',
        provider: 'local'
      };

      tasklist = {
        title: 'Tasklist Title',
        description: 'Tasklist description',
        deadline: new Date(2015, 11, 15),
        status: {
          started: true,
          completed: false,
          timeAllocated: 50,
          timeSpent: date.setMinutes(date - 40),
        },    
        important: true,
        urgent: false
      };

      tasklistResponse = {
        title: 'New Title',
        description: 'Tasklist description',
        deadline: new Date(2015, 11, 15),
        status: {
          started: true,
          completed: false,
          timeAllocated: 50,
          timeSpent: date.setMinutes(date - 40),
        },    
        important: true,
        urgent: false,
        createdBy: user._id
      };

    });

    it('Should add a new tasklist to the database', function() {
      $httpBackend.whenPOST('tasklists').respond(200, tasklistResponse);
      Tasklist.createTasklist(tasklist, user._id, function (res) {
        expect(res.object.createdBy).toBe(user._id);
      });
      $httpBackend.flush();       
    });
    it('Should update a tasklist', function() {
      $httpBackend.whenPUT('tasklists').respond(200, tasklistResponse);
      Tasklist.updateTasklist(tasklist, function (res) {
        expect(res.object.title).toBe('New Title');
      });
      $httpBackend.flush();       
    }); 
    it('Should delete a tasklist', function() {
      $httpBackend.whenDELETE('tasklists').respond(200);
      Tasklist.deleteTasklist(tasklist, function (res) {
        expect(res.message).toBe('Tasklist Deleted');
      });
      $httpBackend.flush();       
    });    
  });
}());