'use strict';

angular.module('core').filter('timeSeconds',
  function() {
    var TimeFilters;

    TimeFilters = {
      minutes: function minutes (seconds) {
        var minutes;
        minutes = parseInt(seconds / 60, 10);
        return minutes;
      },
      seconds: function seconds (seconds) {
        var seconds;
        seconds = parseInt(seconds % 60, 10);
        return seconds;        
      }
    };

    return TimeFilters.seconds;

});