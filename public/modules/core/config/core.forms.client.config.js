'use strict';

// Setting up forms
angular.module('core').config(function(formlyConfigProvider) {
    formlyConfigProvider.setType({
      name: 'input',
      template: '/modules/core/views/forms/input.html'
    });
    formlyConfigProvider.setType({
      name: 'select',
      templateUrl: '/modules/core/views/forms/select.html'
    });
    formlyConfigProvider.setType({
      name: 'password',
      templateUrl: '/modules/core/views/forms/password.html'
    });
    formlyConfigProvider.setType({
      name: 'date',
      templateUrl: '/modules/core/views/forms/date.html'
    });
});
