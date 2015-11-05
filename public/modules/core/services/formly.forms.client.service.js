'use strict';

angular.module('core').factory('FormlyForms', function() {
		var form;

		return {
			createTask: function(model) {
				form = [
		      {
		        type: 'input',
		       	key: 'title',
		        templateOptions: {
		        	class: 'task-title',
		        	key: 'title',
		          required: true,
		          lable: 'Title',
		          placeholder: 'Task Title'
		        }
		      },
		      {
		        type: 'input',
		        templateOptions: {
		        	class: 'task-description',
		        	key: 'description',
		          required: true,
		          lable: 'Description',
		          placeholder: 'Plans are nothing; planning is everything'
		        }
		      },
		      {
		        type: 'date',
		        templateOptions: {
		        	key: 'deadline',
		          lable: 'Deadline',
		        }
		      },		      		      					
		      {
		        type: 'checkbox',
		        templateOptions: {
		        	model: model.status,
		        	key: 'important',
		          lable: 'Important',
		        }
		      },		      
		      {
		        type: 'checkbox',
		        templateOptions: {
		        	model: model.status,
		        	key: 'urgent',
		          lable: 'Urgent',
		        }
		      },		      
				];
				return form;
			}			
		};
	}
);