// var app = angular.module("AppBanHang", []);
// app.controller("CartController", function ($scope, $http, $window) {
//   // Load cart data from localStorage
//   $scope.cartItems = JSON.parse(localStorage.getItem("cart")) || [];

//   // Function to remove item from cart
//   $scope.removeItem = function (index) {
//     $scope.cartItems.splice(index, 1);
//     localStorage.setItem("cart", JSON.stringify($scope.cartItems));
//   };

//   // Function to decrease quantity
//   $scope.decreaseQuantity = function (index) {
//     if ($scope.cartItems[index].quantity > 1) {
//       $scope.cartItems[index].quantity--;
//       localStorage.setItem("cart", JSON.stringify($scope.cartItems));
//     }
//   };

//   // Function to increase quantity
//   $scope.increaseQuantity = function (index) {
//     $scope.cartItems[index].quantity++;
//     localStorage.setItem("cart", JSON.stringify($scope.cartItems));
//   };

//   // Function to update quantity
//   $scope.updateQuantity = function (index) {
//     if ($scope.cartItems[index].quantity < 1) {
//       $scope.cartItems[index].quantity = 1;
//     }
//     localStorage.setItem("cart", JSON.stringify($scope.cartItems));
//   };
// });
var app = angular.module("AppBanHang", []);
const getSP = document.querySelectorAll(".cart-content__item");

app.controller("CartController", function ($scope, $http, $window) {
  // Load cart data from localStorage
  $scope.cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Thêm sự kiện removeItem vào controller
  $scope.removeItem = function (index) {
    var confirmRemove = confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
    );

    if (confirmRemove) {
      // Xóa sản phẩm khỏi giỏ hàng
      $scope.cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify($scope.cartItems));
    } else {
      // Người dùng chọn "Không", không thực hiện xóa
    }
  };

  // Function to decrease quantity
  $scope.decreaseQuantity = function (index) {
    if ($scope.cartItems[index].quantity > 1) {
      $scope.cartItems[index].quantity--;
      localStorage.setItem("cart", JSON.stringify($scope.cartItems));
    }
  };

  // Function to increase quantity
  $scope.increaseQuantity = function (index) {
    $scope.cartItems[index].quantity++;
    localStorage.setItem("cart", JSON.stringify($scope.cartItems));
  };

  // Function to get total quantity
  $scope.getTotalQuantity = function () {
    let totalQuantity = 0;
    for (let item of $scope.cartItems) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  };

  // Function to get total price
  $scope.getTotalPrice = function () {
    let totalPrice = 0;
    for (let item of $scope.cartItems) {
      totalPrice += item.quantity * item.price; // Giả sử có trường price trong dữ liệu sản phẩm
    }
    return totalPrice;
  };

  // Function to update quantity
  // $scope.updateQuantity = function (index) {
  //   if ($scope.cartItems[index].quantity < 1) {
  //     $scope.cartItems[index].quantity = 1;
  //   }
  //   localStorage.setItem("cart", JSON.stringify($scope.cartItems));
  // };
  //console.log("Data to be stored in LocalStorage:", $scope.cartItems);
});
