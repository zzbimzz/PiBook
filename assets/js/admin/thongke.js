//import convertFormData from "../convertFormData.js";
let total = 0;
let pageIndex = 1;

var app = angular.module("AppBanHang", []);
app.controller("ThongKeCtrl", function ($scope, $http) {
  document.getElementById("btn-course").addEventListener("click", function () {
    // hàm tính tổng tiền
    $scope.calculateTotalAmount = function () {
      $scope.totalAmountSum = 0;

      // Loop through each invoice in the list
      angular.forEach($scope.listItem, function (item) {
        // Add the totalAmount value of each invoice to the sum
        $scope.totalAmountSum += item.totalAmount;
      });
    };
    $scope.ThongKeHDB = function (index) {
      var from_date = document.getElementById("from_date").value;
      var to_date = document.getElementById("to_date").value;
      if (from_date === "" || to_date === "") {
        alert("Vui lòng nhập thời gian cần thống kê.");
      } else {
        $http({
          method: "POST",
          data: {
            page: index,
            pageSize: 10,
            from_date: from_date,
            to_date: to_date,
          },
          url: current_url + "/api-admin/oders/ThongKe",
        }).then(function (response) {
          // debugger;
          $scope.listItem = response.data.data;
          total = Number(response.data.totalItems);
          $scope.calculateTotalAmount();
          reload(response.data.data);
        });
      }
    };

    function reload(data) {
      setTimeout(() => {
        // Navigation
        const totalPages = Math.ceil(total / 10);

        document.querySelector(".navigation").innerHTML = "";
        for (let index = 0; index < totalPages; index++) {
          document.querySelector(".navigation").innerHTML += `
                      <button data-id="${index + 1}" class="btn-primary">${
            index + 1
          }</button>
                  `;
        }
        const btnNavigation = document.querySelectorAll("button[data-id]");
        btnNavigation.forEach((item) => {
          item.onclick = () => {
            console.log(item.dataset.id);
            $scope.ThongKeHDB(item.dataset.id);
          };
        });
      });
    }

    //
    setTimeout(() => {
      const soluong = document.querySelector("#soluong");
      console.log(soluong);
      soluong.innerHTML = total;
    }, 1000);
    $scope.ThongKeHDB(pageIndex);
    //

    $scope.formatDate = function (params) {
      var updatedAtDate = new Date(params);
      return `${updatedAtDate.getDate()}/${
        updatedAtDate.getMonth() + 1
      }/${updatedAtDate.getFullYear()}`;
    };
  });
});
