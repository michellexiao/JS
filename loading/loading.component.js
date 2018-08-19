(function() {
"use strict";

angular.module('loadingModule')
.component('loading', {
  //template: '<div ng-if="$ctrl.show" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:40%">40%</div>',
  templateUrl:'loading/progressBar.html',
  bindings: {
    $ctrl: '<'
  },
  controller: LoadingController
});


LoadingController.$inject = ['$rootScope'];
function LoadingController ($rootScope) {
  var $ctrl = this;
  var listener;

  $ctrl.$onInit = function() {
    $ctrl.show = false;
    listener = $rootScope.$on('loading:activate', onSpinnerActivate);
    console.log("Percentage "+$ctrl.percentage);

  };

  $ctrl.$onDestroy = function() {
    listener();
  };

  function onSpinnerActivate(event, data) {
    $ctrl.show = data.on;
  }
}

})();
