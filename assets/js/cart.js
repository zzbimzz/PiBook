var app = angular.module("AppBanHang", []);
const getSP = document.querySelectorAll(".cart-content__item");

app.controller("CartController", function ($scope, $http, $window) {
  var userID = localStorage.getItem("userID");
  // Load cart data from localStorage
  $scope.cartItems = JSON.parse(localStorage.getItem("cart" + userID)) || [];

  // Thêm sự kiện removeItem vào controller
  $scope.removeItem = function (index) {
    var confirmRemove = confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
    );

    if (confirmRemove) {
      // Xóa sản phẩm khỏi giỏ hàng
      $scope.cartItems.splice(index, 1);
      //
      localStorage.setItem("cart" + userID, JSON.stringify($scope.cartItems));
    } else {
      // Người dùng chọn "Không", không thực hiện xóa
    }
  };

  // giảm số lượng
  $scope.decreaseQuantity = function (index) {
    if ($scope.cartItems[index].quantity > 1) {
      $scope.cartItems[index].quantity--;
      localStorage.setItem("cart" + userID, JSON.stringify($scope.cartItems));
    }
  };

  // tăng số lượng
  $scope.increaseQuantity = function (index) {
    $scope.cartItems[index].quantity++;
    localStorage.setItem("cart" + userID, JSON.stringify($scope.cartItems));
  };

  // hàm tính tổng số lượng trong giỏ hàng
  $scope.getTotalQuantity = function () {
    let totalQuantity = 0;
    for (let item of $scope.cartItems) {
      // lặp qua từng sản phẩm trong giỏ hàng
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  };

  // hàm tình tổng số tiền
  $scope.getTotalPrice = function () {
    let totalPrice = 0;
    for (let item of $scope.cartItems) {
      totalPrice += item.quantity * item.price; // Giả sử có trường price trong dữ liệu sản phẩm
    }
    return totalPrice;
  };

  // Function to navigate to the payment page with the cart items
  $scope.goToPaymentPage = function () {
    $window.location.href = "/pay.html";
  };
});
