'use strict';

angular.module('tasks').controller('TaskRunnerController', ['$scope', 'Task', 'Tasklist', 'Ikebox', '$stateParams', '$interval',
	function($scope, Task, Tasklist, Ikebox, $stateParams, $interval) {
    var trVm = this,
        init,
        getTasklist,
        minutes,
        seconds,
        timeCalculator,
        calculatedTime,
        timer,
        updater;

    init = function init () {
      Tasklist.findTasklist($stateParams.tasklistId, function (tasklist) {
        trVm.tasklist = tasklist;
        trVm.timerRunning = false;
      });
    };
    init();

    getTasklist = function getTasklist (tasklistId) {
      Tasklist.findTasklist(tasklistId, function (tasklist) {
        trVm.tasklist = tasklist;
      })      
    };

    timeCalculator = function timeCalc (task) {
      var timeRemaining,
          timeSpent,
          calculatedTime,
          still,
          countdown;

      still = function () {
        timeRemaining = task.status.timeAllocated;
        timeSpent = task.status.timeSpent;
        calculatedTime = timeRemaining - timeSpent;
        trVm.secondTracker = parseInt((timeRemaining - timeSpent) % 60, 10);
        return calculatedTime;
      };
      
      countdown = function () {
        timeRemaining = task.status.timeAllocated;
        timeSpent = task.status.timeSpent++;
        calculatedTime = timeRemaining - timeSpent;
        trVm.secondTracker = parseInt((timeRemaining - timeSpent) % 60, 10);        
        return calculatedTime;
      };
      
      return {
        still: still,
        countdown: countdown
      };

    };

    trVm.removeFromTasklist = function removeFromTasklist (tasklist, index) {
      tasklist.tasks.splice(index, 1);
      tasklist.$update(function (tasklist) {
        trVm.tasklist = tasklist;
      }, function (error) {
        alert('Failed')
      })
    }

    trVm.setTask = function setTask (task) {
      trVm.currentTask = task;      
      trVm.timer = timeCalculator(task).still();        
    };

    trVm.toggleTask = function startTask (task) {
      // check if timer is running
      if (trVm.timerRunning === false) {
        trVm.timerRunning = true;        
        // start the timer
        timer = $interval(function () {                  
          if (trVm.timer <= 0) {
            $interval.cancel(timer);
            $interval.cancel(updater);
            trVm.timerRunning = false;
            Task.updateTask(task, function (response) {
              if (response.error) {
                console.log(response.error)
              } else {
                console.log(response.object);
              }          
            })            
          };
          // calculate time remaining
          trVm.timer = timeCalculator(task).countdown();
        }, 1000);
        // update task on regular basis to avoid lost data
        updater = $interval(function () {
          task.status.started = true;
          Task.updateTask(task, function (response) {
            if (response.error) {
              console.log(response.error)
            } else {
              console.log(response.object);
            }          
          })
        }, 10000); 

      } else {
        trVm.timerRunning = false;
        $interval.cancel(timer);
        $interval.cancel(updater);
        Task.updateTask(task, function (response) {
          if (response.error) {
            console.log(response.error)
          } else {
            console.log(response.object);
          }          
        });        
      };
    };

    trVm.completeTask = function completeTask (task) {
      Task.completeTask(task, function (response) {
        if (response.error) {
          console.log(response.error)
        } else {
          console.log(response.object);
        }          
      });      
    }

	}
]);