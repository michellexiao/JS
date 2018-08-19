(function () {
'use strict';

angular.module('NarrowItDownApp', ['loadingModule'])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://michelle-course5.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective(){
  var ddo = {
    templateUrl: 'foundItems.html',
    scope:{
      found:'<',
      nothingFound: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;

}

NarrowItDownController.$inject = ['MenuSearchService','$scope','$rootScope'];

function NarrowItDownController(MenuSearchService,$scope,$rootScope){
  var menu = this;
  $scope.length = 0;

  menu.logMenuItems = function (searchTerm){

    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    menu.nothingFound = false;
    promise.then(function(response){
      menu.found = response;
      menu.title = "Found "+ menu.found.length + " items";
      $scope.length = menu.found.length;

      if (menu.found.length==0){
        menu.nothingFound = true;
      }

      console.log("Within promise: ", menu.nothingFound);
    })
    .catch(function(error){
      console.log("Somthing went wrong");
      menu.nothingFound = true;
      console.log("Within error: ", menu.nothingFound);
    })
  };


  menu.removeItems = function(itemIndex){
    menu.found.splice(itemIndex,1);
    menu.title = "Found "+ menu.found.length + " items";
  };


}

MenuSearchService.$inject = ['$http','ApiBasePath'];

function MenuSearchService($http, ApiBasePath){
  var service = this;
  service.requestStart = false;

  // service.nothingFound = false;

  service.getMatchedMenuItems = function(searchTerm){
    console.log("searchTerm:"+searchTerm+"XXXX");
    console.log("empty or not? ", searchTerm==undefined);


    return $http({
      method:"GET",
      url:(ApiBasePath + "/menu_items.json"),
    })


    .then(function (response) {
      service.requestStart = true;

      console.log("All items: ",response.data);
      // process result and only keep items that match
      searchTerm = searchTerm.toLowerCase();

      var allItems = response.data.menu_items;

      var foundItems = [];

      for (var i in allItems){
        //console.log("Loop started.");
        //console.log("Current item: ",allItems[i]);
        var item = allItems[i];
        //console.log("description: ",item.description);
        //console.log(item.description.toLowerCase().indexOf(searchTerm));
        if(searchTerm!="" && item.description.toLowerCase().indexOf(searchTerm) != -1){
          console.log("Found a match!");
        //  console.log("description is: ",item.description);
          foundItems.push(item);
        }
      }


      console.log('Found items: ',foundItems);
      console.log("Totally: ", foundItems.length);
      service.requestStart = false;


      // return processed items
      return foundItems;
  })
    .catch(function(error){
      console.log("Somthing went wrong");
    })
  };

}

})();
