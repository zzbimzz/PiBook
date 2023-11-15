const form = document.forms["form__login"];

const btnLg = document.querySelector(".form-login-btn");
var app = angular.module("AppBanHang", []);

app.controller("HomeLogin", function ($scope, $http) {
  $scope.listAccount = [];

  $scope.Account = function (data) {
    $http({
      method: "POST",
      data,

      url: current_url + "/api/User/login",
    }).then(function (response) {
      localStorage.setItem("account", JSON.stringify(response.data));
      response.data.role === false
        ? location.assign("/")
        : location.assign("./Admin/MainAdmin.html");
    });
  };
  function handleForm() {
    btnLg.onclick = function () {
      var username = form.elements.username.value;
      var password = form.elements.password.value;
      if (username === "" || password === "") {
        alert("Bạn chưa nhập đủ thông tin tài khoản!");
        return;
      }
      var formData = {
        username,
        password,
      };
      $scope.Account(formData);
    };

    form.onsubmit = (e) => {
      e.preventDefault();
    };
  }
  handleForm();
});
