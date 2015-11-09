'use strict';

angular.module('ikeboxes').controller('IkeboxListController', ['$scope', 'Ikebox', 'FoundationApi',
	function($scope, Ikebox, FoundationApi) {
    var iblVm = this,
        init;

    init = function init () {
      Ikebox.findAllIkeboxes(function (ikeboxes) {
        iblVm.ikeboxes = ikeboxes;
      }); 
    };
    init();

    // Form Models

    iblVm.ikeboxObj = {
      title: '',
      description: ''
    };

    ////
    // ikebox Functions
    ////

    iblVm.createIkebox = function createIkebox (ikebox, userId) {
      Ikebox.createIkebox(ikebox, userId, function (response) {
        if (response.err) { 
          alert('Cannot save ikebox');
        } else {
          FoundationApi.closeActiveElements('create-ikebox-modal');          
          iblVm.ikeboxes.push(response.object);
          iblVm.ikeboxObj = {};
        }               
      });
    };

    iblVm.editIkebox = function editikebox (ikebox) {            
      console.log(ikebox);
      Ikebox.updateIkebox(iblVm.ikebox, function (response) {
        if (response.error) {
          alert('Cannot edit ikebox')
        } else {  
          iblVm.editingikebox = {};
          FoundationApi.closeActiveElements('edit-ikebox-modal');          
        }
      });
    };    

    // TODO two step delete process
    iblVm.deleteIkebox = function deleteIkebox (ikebox, index) {
      Ikebox.deleteIkebox(ikebox, function (response) {
        if (response.err) { 
          alert('Cannot delete ikebox');          
        } else {
          iblVm.ikeboxes.splice(index, 1);
        }
      });
    };

	}
]);