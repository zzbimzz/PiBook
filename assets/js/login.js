const form = document.forms["form-register"];

//const btnLg = document.querySelector(".form-login-btn");
import convertFormData from "../js/convertFormData.js";
const formDataObject = {};
const btnRegister = document.querySelector("#form-register-btn");
var app = angular.module("AppBanHang", []);

app.controller("HomeLogin", function ($scope, $http) {
  // khởi tạo biến
  $scope.userName = "";
  $scope.password = "";
  $scope.dataUser;

  // start login

  $scope.login = function () {
    var data = {
      userName: $scope.userName,
      password: $scope.password,
    };
    $http({
      method: "POST",
      url: current_url + "/api-user/User/login",
      data: JSON.stringify(data),
    }).then(function (response) {
      console.log(response);
      $scope.dataUser = response.data;

      switch ($scope.dataUser.role) {
        case true:
          // xử lý khi có quyền truy cập
          if ($scope.dataUser.userID) {
            console.log($scope.dataUser.userID);
            window.location.href = `./Admin/MainAdmin.html?id=${$scope.dataUser.userID}`;
            localStorage.setItem("userID", $scope.dataUser.userID);
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

  // end login

  // start RegisterUser

  $scope.CreateUser = function (data) {
    console.log("create");

    $http({
      method: "POST",
      data,
      url: current_url + "/api-user/registerUser/create-registerUser",
    }).then(function (response) {
      alert("Đăng ký thành công thành công");
      location.reload();
    });
  };
  // end RegisterUser

  // sự kiện nhấn vào nút đăng ký
  btnRegister.onclick = () => {
    $scope.CreateUser(formDataObject);
  };
});

// xử lý các sự kiện submit
form.onsubmit = (e) => {
  e.preventDefault();
  Object.assign(formDataObject, convertFormData(form));
};
