var app = angular.module("AppBanHang", []);
app.controller("PayController", function ($scope, $http, $window) {
  // Lấy userID từ localStorage
  var userID = localStorage.getItem("userID");

  // Load danh sách sản phẩm từ giỏ hàng
  $scope.cartItems = JSON.parse(localStorage.getItem("cart" + userID)) || [];

  // Function to calculate total price
  $scope.getTotalPrice = function () {
    let totalPrice = 0;
    for (let item of $scope.cartItems) {
      totalPrice += item.quantity * item.price; // Thay thế bằng tên trường chứa giá của sản phẩm
    }
    return totalPrice;
  };
});
