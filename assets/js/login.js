//const form = document.forms["form__login"];

//const btnLg = document.querySelector(".form-login-btn");
var app = angular.module("AppBanHang", []);

app.controller("HomeLogin", function ($scope, $http) {
  $scope.userName = "";
  $scope.password = "";
  $scope.dataUser;
  $scope.login = function () {
    var data = {
      userName: $scope.userName,
      password: $scope.password,
    };
    $http({
      method: "POST",
      url: current_url + "/api/User/login",
      data: JSON.stringify(data),
    }).then(function (response) {
      console.log(response);
      $scope.dataUser = response.data;

      switch ($scope.dataUser.role) {
        case true:
          if ($scope.dataUser.userID) {
            window.location.href = `./Admin/MainAdmin.html?id=${$scope.dataUser.userID}`;
          } else {
            console.log("Không có ID để chuyển hướng.");
          }
          break;
        case false:
          if ($scope.dataUser.userID) {
            window.location.href = `./index.html?id=${$scope.dataUser.userID}`;
            localStorage.setItem("userID", $scope.dataUser.userID);
          } else {
            console.log("Không có ID để chuyển hướng.");
          }
          break;
        default:
          console.log($scope.dataUser.role);
      }
    });
  };
});

//   $scope.Account = function (data) {
//     $http({
//       method: "POST",
//       data,

//       url: current_url + "/api/User/login",
//     }).then(function (response) {
//       localStorage.setItem("account", JSON.stringify(response.data));
//       response.data.role === false
//         ? location.assign("/")
//         : location.assign("./Admin/MainAdmin.html");
//     });
//   };
//   function handleForm() {
//     btnLg.onclick = function () {
//       var username = form.elements.username.value;
//       var password = form.elements.password.value;
//       if (username === "" || password === "") {
//         alert("Bạn chưa nhập đủ thông tin tài khoản!");
//         return;
//       }
//       var formData = {
//         username,
//         password,
//       };
//       $scope.Account(formData);
//     };

//     form.onsubmit = (e) => {
//       e.preventDefault();
//     };
//   }
//   handleForm();
// });
