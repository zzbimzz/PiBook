var app = angular.module("AppBanHang", []);
const btnAddToCart = document.querySelector(".btn-add-to-cart");
//console.log(btnAddToCart);

app.controller("HomeProductDetail", function ($scope, $http, $window) {
  $scope.listAuthors = [];
  $scope.IDGenres;

  //idNguoiDung
  var userID = localStorage.getItem("userID");
  console.log(userID);
  //var accountName = "user_" + userID;

  //
  $scope.loadGenres = function () {
    var urlObject = new URL(window.location.href);
    var id = urlObject.searchParams.get("id");
    $http({
      method: "GET",
      url: current_url + `/api-user/books/get-by-id/${id}`,
    }).then(function (response) {
      $scope.IDGenres = response.data;
    });
  };
  $scope.loadGenres();

  // //addtocart
  btnAddToCart.onclick = function () {
    $scope.addToCart($scope.IDGenres);
  };

  // Hàm chung để load thông tin sản phẩm
  // $scope.loadGenres = function () {
  //   var urlObject = new URL(window.location.href);
  //   var id = urlObject.searchParams.get("id");

  //   $http({
  //     method: "GET",
  //     url: current_url + `/api/Books/get-by-id/${id}`,
  //   }).then(function (response) {
  //     //debugger;
  //     $scope.IDGenres = response.data;
  //   });
  // };

  // $scope.loadGenres();

  // Hàm chung để thêm sản phẩm vào giỏ hàng
  $scope.addToCart = function (item) {
    console.log("Adding to cart:", item);
    item.quantity = 1;

    // Lấy danh sách sản phẩm từ localStorage
    var cartItems = JSON.parse(localStorage.getItem("cart" + userID)) || [];
    console.log(cartItems);

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    var existingItem = cartItems.find((x) => x.bookID === item.bookID);

    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      existingItem.quantity += 1;
      alert("Đã thêm vào giỏ hàng thành công!");
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào danh sách
      cartItems.push(item);
      //
      alert("Đã thêm vào giỏ hàng thành công!");
    }

    // Lưu lại danh sách sản phẩm vào localStorage
    localStorage.setItem("cart" + userID, JSON.stringify(cartItems));

    //alert("Đã thêm vào giỏ hàng thành công!");

    var confirmAddToCart = confirm("Bạn có muốn đến giỏ hàng không?");

    if (confirmAddToCart) {
      // Chuyển hướng tới trang giỏ hàng và truyền ID sản phẩm vừa thêm
      $window.location.replace("/cart.html");
    } else {
      // Người dùng chọn "Không", không thực hiện chuyển hướng
    }
  };
});
