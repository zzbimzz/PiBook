var app = angular.module("AppBanHang", []);
app.controller("HomeCtrl", function ($scope, $http) {
  $scope.listMenu = [];
  $scope.listNotifi = [];
  $scope.listAuthors = [];
  $scope.listGenres = [];
  $scope.listItem;
  $scope.LoadMenu = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Books/get-all",
    }).then(function (response) {
      console.log(response.data);
      $scope.listMenu = response.data;
    });
  };

  $scope.LoadMenu();

  // notifi
  $scope.loadNotifi = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Notifications/getAll-notifi",
    }).then(function (response) {
      console.log(response.data);
      $scope.listNotifi = response.data;
    });
  };

  $scope.loadNotifi();

  // Authors
  $scope.loadAuthors = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Authors/get-all",
    }).then(function (response) {
      console.log(response.data);
      $scope.listAuthors = response.data;
    });
  };

  $scope.loadAuthors();

  // Genres
  $scope.loadGenres = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Genres/get-all",
    }).then(function (response) {
      console.log(response.data);
      $scope.listGenres = response.data;
    });
  };

  $scope.loadGenres();

  //   $scope.GetBanChay = function () {
  //     $http({
  //       method: "POST",
  //       data: { page: 1, pageSize: 5 },
  //       url: current_url + "/api/Books/search",
  //     }).then(function (response) {
  //       debugger;
  //       $scope.listItem = response.data.data;
  //     });
  //   };
  //   $scope.GetBanChay();
});
