var app = angular.module("AppBanHang", []);
const searchInput = document.querySelector(".header__search-input-text");
app.controller("HomeCtrl", function ($scope, $http) {
  $scope.listMenu = [];
  $scope.listNotifi = [];
  $scope.listAuthors = [];
  $scope.listGenres = [];
  $scope.listCarts = [];
  $scope.listBookGenres = [];
  $scope.getBookId = [];
  $scope.listBookHot = [];
  $scope.listItem = [];
  $scope.searchTerm = "";

  // Tim kiem
  $scope.SeachProduct = function (Title) {
    $http({
      method: "POST",
      data: { page: 1, pageSize: 10, Title }, // Sử dụng ng-model "searchTerm"
      url: current_url + "/api/Books/search",
    }).then(function (response) {
      // debugger;
      $scope.listItem = response.data.data;
    });
  };

  searchInput.oninput = () => {
    if (searchInput.value !== "") {
      $scope.SeachProduct(searchInput.value);
    }
  };

  // BookHot

  $scope.BookHot = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Books/get-bookHot",
    }).then(function (response) {
      // console.log(response.data);
      $scope.listBookHot = response.data;
    });
  };

  $scope.BookHot();

  // $scope.viewProductDetail = function (x) {
  //   $http({
  //     method: "GET",
  //     url: current_url + `/api/Books/get-by-id/${x.bookID}`,
  //   }).then((res) => {
  //     const detail = JSON.stringify(res.data);
  //     localStorage.setItem("detail", detail);
  //     window.location.href = "./product.html";
  //   });
  // };

  $scope.LoadMenu = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Books/get-all",
    }).then(function (response) {
      // console.log(response.data);
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
      // console.log(response.data);
      $scope.listNotifi = response.data;
    });
  };

  $scope.loadNotifi();

  //Authors;
  $scope.loadAuthors = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Authors/get-all",
    }).then(function (response) {
      // console.log(response.data);
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
      // console.log(response.data);
      $scope.listGenres = response.data;
    });
  };
  $scope.loadGenres();

  //BookGenres
  $scope.loadBookGenres = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Books/get-by-genre",
    }).then(function (response) {
      $scope.listBookGenres = response.data;
      //debugger;
    });
  };

  $scope.loadBookGenres();

  // Carts
  $scope.loadCarts = function () {
    $http({
      method: "GET",
      url: current_url + "/api/Carts/get-all",
    }).then(function (response) {
      // console.log(response.data);
      $scope.listCarts = response.data;
    });
  };

  $scope.loadCarts();
});
