var app = angular.module("AppBanHang", []);
app.controller("PayController", function ($scope, $http, $window) {
  // Lấy userID từ localStorage
  var userID = localStorage.getItem("userID");

  $scope.user = "";

  //lay thong tin User

  $scope.loadUser = () => {
    var userID = localStorage.getItem("userID");
    console.log(userID);
    $http({
      method: "GET",
      url: current_url + "/api-user/customer/get-by-id/" + userID,
    }).then((response) => {
      debugger;
      $scope.user = response.data;
      $scope.customerID = $scope.user.customerID;
      $scope.name = $scope.user.name;
      $scope.email = $scope.user.email;
      $scope.phone = $scope.user.phone;
      $scope.address = $scope.user.address;
      console.log(response.data);
    });
  };

  $scope.loadUser();

  // Load danh sách sản phẩm từ giỏ hàng
  var cartItems =
    JSON.parse(window.localStorage.getItem("cart" + userID)) || {};

  $scope.cartItems =
    JSON.parse(window.localStorage.getItem("cart" + userID)) || [];

  console.log(cartItems);

  // Function to calculate total price
  $scope.getTotalPrice = function () {
    let totalPrice = 0;
    for (let item of $scope.cartItems) {
      totalPrice += item.quantity * item.price; // Thay thế bằng tên trường chứa giá của sản phẩm
    }
    return totalPrice;
  };

  // Gán thông tin sản phẩm cho $scope để hiển thị trong HTML
  $scope.cartItems = cartItems;
  $scope.orderID = "";
  $scope.orderDetailID = "";
  $scope.bookID = cartItems[0].bookID;
  $scope.orderDate = new Date();
  $scope.quantity = "";
  $scope.subtotal = "";
  $scope.user = "";

  $scope.createHoaDon = () => {
    var data = {
      customerID: $scope.customerID,

      totalAmount: $scope.getTotalPrice(),
      orderDate: $scope.orderDate.toISOString(),
      statusOrder: true,

      list_json_chitiethoadon: cartItems,
    };
    $http({
      method: "POST",
      url: current_url + "/api-user/oders/create-hoadon",
      data: JSON.stringify(data), // chuyển đổi JS thành Json
    }).then((response) => {
      //debugger;
      console.log(response.data);
      if (response.data != undefined) {
        // Save user information to localStorage
        localStorage.setItem("user", JSON.stringify($scope.user));

        // Save order details to localStorage
        localStorage.setItem("order", JSON.stringify(response.data));

        // Save cart items to localStorage (if needed)
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        alert("Đặt hàng thành công");
        var confirmAddToCart = confirm("Bạn có muốn in hóa đơn không?");

        if (confirmAddToCart) {
          // Chuyển hướng tới trang giỏ hàng và truyền ID sản phẩm vừa thêm
          $window.location.replace("./inHDB.html");
        } else {
          // Người dùng chọn "Không", không thực hiện chuyển hướng
        }
      } else {
        alert("That bai");
      }
    });
  };
});
