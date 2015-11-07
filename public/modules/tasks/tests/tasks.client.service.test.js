'use strict';

(function() {
  // Followers Service Spec
  describe('Tasks Service Tests', function() {
    // Initialize global variables
    var Task,
        Users,
        scope,
        $httpBackend,
        $stateParams,
        $location,
        user,
        task,
        taskResponse,
        sampleTask,
        sampleTaskResponse,
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
    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Task_, _Users_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Task = _Task_;
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

      task = {
        title: 'Task Title',
        description: 'Task description',
        deadline: new Date(2015, 11, 15),
        status: {
          started: true,
          completed: false,
          timeAllocated: 50,
          timeSpent: date.setMinutes(date - 40),
        },    
        important: true,
        urgent: false,
        subTasks: []
      };

      taskResponse = {
        _id: '525cf20451979dea2c000003',
        title: 'New Title',
        description: 'Task description',
        deadline: new Date(2015, 11, 15),
        status: {
          started: true,
          completed: false,
          timeAllocated: 50,
          timeSpent: date.setMinutes(date - 40),
        },    
        important: true,
        urgent: false,
        createdBy: user._id,
        subTasks: [task]
      };

    });

    it('Should add a new task to the database', function() {
      $httpBackend.whenPOST('tasks').respond(200, taskResponse);
      Task.createTask(task, user._id, function (res) {
        expect(res.object.createdBy).toBe(user._id);
      });
      $httpBackend.flush();       
    });
    it('Should add a new subtask to the database and create a parent task record', function() {
      $httpBackend.whenPOST('tasks').respond(200, task);
      $httpBackend.whenPUT('tasks/' + taskResponse._id).respond(200, taskResponse);
      Task.createSubtask(taskResponse, task, user._id, function (res) {
        console.log(res.object);
        // expect(res.object.subTasks.length).toBe(1);
      });
      $httpBackend.flush();       
    });    
    it('Should update a task', function() {
      $httpBackend.whenPUT('tasks').respond(200, taskResponse);
      Task.updateTask(task, function (res) {
        expect(res.object.title).toBe('New Title');
      });
      $httpBackend.flush();       
    }); 
    it('Should delete a task', function() {
      $httpBackend.whenDELETE('tasks/' + taskResponse._id).respond(200);
      Task.deleteTask(taskResponse._id, function (res) {
        expect(res.message).toBe('Task Deleted');
      });
      $httpBackend.flush();       
    });    
  });
}());