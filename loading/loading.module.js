(function(){
  'use strict';

  angular.module('loadingModule',[])
  .config(config);

  config.$inject = ['$httpProvider'];
  function config($httpProvider){
    $httpProvider.interceptors.push('loadingHttpInterceptor');
  }
}
)();
