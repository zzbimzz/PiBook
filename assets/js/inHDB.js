var app = angular.module("AppAdmin", []);
app.controller("inHDBCtrl", function ($scope, $http, $timeout) {
  var userID = localStorage.getItem("userID");

  console.log(userID);
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.order = JSON.parse(localStorage.getItem("order"));
  $scope.cartItems = JSON.parse(localStorage.getItem("cartItems"));

  console.log($scope.user);
  console.log($scope.order);
  console.log($scope.cartItems);

  //
  $scope.formatDate = function (params) {
    var updatedAtDate = new Date(params);
    return `${updatedAtDate.getDate()}/${
      updatedAtDate.getMonth() + 1
    }/${updatedAtDate.getFullYear()}`;
  };
  //

  $scope.calculateTotalAmount = function () {
    let totalAmount = 0;
    for (let item of $scope.cartItems) {
      totalAmount += item.price * item.quantity;
    }
    return totalAmount;
  };
  $scope.totalAmount = $scope.calculateTotalAmount();
  //
  $scope.inHoaDon = function () {
    $timeout(function () {
      window.print();
    }, 2000);
  };
});
