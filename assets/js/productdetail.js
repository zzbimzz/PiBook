// var app = angular.module("AppBanHang", []);
// app.controller("HomeProductDetail", function ($scope, $http, $window) {
//   $scope.listAuthors = [];
//   $scope.IDGenres;

//   var urlObject = new URL(window.location.href); // tao doi tuong url
//   var id = urlObject.searchParams.get("id");

//   // Genres
//   $scope.loadGenres = function () {
//     $http({
//       method: "GET",
//       url: current_url + `/api/Books/get-by-id/${id}`,
//     }).then(function (response) {
//       // console.log(response.data);
//       $scope.IDGenres = response.data;
//     });
//   };

//   $scope.loadGenres();

//   //cart
//   $scope.addToCart = function (item) {
//     console.log("Adding to cart:", item);
//     item.quantity = 1;
//     var list;

//     if (localStorage.getItem("cart") == null) {
//       list = [item];
//     } else {
//       list = JSON.parse(localStorage.getItem("cart")) || [];
//       let ok = true;

//       for (let x of list) {
//         if (x.id == item.id) {
//           x.quantity += 1;
//           ok = false;
//           break;
//         }
//       }

//       if (ok) {
//         list.push(item);
//       }
//     }

//     localStorage.setItem("cart", JSON.stringify(list));
//     alert("Đã thêm giỏ hàng thành công!");
//     // Hộp thoại xác nhận
//     var confirmAddToCart = confirm("Bạn có muốn đến giỏ hàng không?");

//     // Kiểm tra người dùng chọn "Có" hay "Không"
//     if (confirmAddToCart) {
//       // Chuyển hướng tới trang giỏ hàng
//       $window.location.href = "/cart.html?id=" + item.id;
//     } else {
//       // Người dùng chọn "Không", không thực hiện chuyển hướng
//     }
//   };
// });
var app = angular.module("AppBanHang", []);
const btnAddToCart = document.querySelector(".btn-add-to-cart");
//console.log(btnAddToCart);

app.controller("HomeProductDetail", function ($scope, $http, $window) {
  $scope.listAuthors = [];
  $scope.IDGenres;

  //addtocart
  btnAddToCart.onclick = function () {
    $scope.addToCart($scope.IDGenres);
  };

  // Hàm chung để load thông tin sản phẩm
  $scope.loadGenres = function () {
    var urlObject = new URL(window.location.href);
    var id = urlObject.searchParams.get("id");

    $http({
      method: "GET",
      url: current_url + `/api/Books/get-by-id/${id}`,
    }).then(function (response) {
      //debugger;
      $scope.IDGenres = response.data;
    });
  };

  $scope.loadGenres();

  // Hàm chung để thêm sản phẩm vào giỏ hàng
  $scope.addToCart = function (item) {
    console.log("Adding to cart:", item);
    item.quantity = 1;

    // Lấy danh sách sản phẩm từ localStorage
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartItems);

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    var existingItem = cartItems.find((x) => x.bookID === item.bookID);

    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      existingItem.quantity += 1;
      return;
    }

    if (!existingItem) {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào danh sách
      cartItems.push(item);
    }

    // Lưu lại danh sách sản phẩm vào localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    alert("Đã thêm vào giỏ hàng thành công!");

    var confirmAddToCart = confirm("Bạn có muốn đến giỏ hàng không?");

    if (confirmAddToCart) {
      // Chuyển hướng tới trang giỏ hàng và truyền ID sản phẩm vừa thêm
      $window.location.replace("/cart.html");
    } else {
      // Người dùng chọn "Không", không thực hiện chuyển hướng
    }
  };
});
