var app = angular.module("AppBanHang", []);

app.controller("MainCtrl", function ($scope, $http) {
  $scope.loadUser = () => {
    var idLogin = localStorage.getItem("userID");
    console.log(idLogin);
    $http({
      method: "GET",
      url: current_url + "/api-admin/customer/get-by-id/" + idLogin,
    }).then((response) => {
      $scope.user = response.data;

      console.log(response.data);
    });
  };

  $scope.loadUser();
});
