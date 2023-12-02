import convertFormData from "../../../../assets/js/convertFormData.js";

const form = document.forms["form-course"];
const btnCourse = document.querySelector("#btn-course");

const formDataObject = {};
let total = 0;

var app = angular.module("AppBanHang", []);
app.controller("HoaDonBanCtrl", function ($scope, $http) {
  //Xóa hóa đơn
  $scope.DeleteHoaDon = function (id) {
    console.log("delete");

    confirm("Bạn có chắc chắn muốn xóa?") &&
      $http({
        method: "DELETE",
        url: current_url + "/api-admin/oders/delete-hoadon?id=" + id,
      }).then(function (response) {
        location.reload();
        alert("Bạn xóa thành công.");
      });
  };

  // Lấy khóa học theo id

  $scope.GetByHoaDonID = function (id) {
    $http({
      url: current_url + "/api-admin/oders/get-by-id/" + id,
      method: "GET",
    }).then(function (response) {
      $scope.chitiethoadon = response.data.list_json_chitiethoadon123;
    });
  };

  // hien thi hoa don
  let pageIndex = 1;

  $scope.GetHoaDon = function () {
    $http({
      method: "GET",
      url: current_url + "/api-admin/oders/get-all",
    }).then(function (response) {
      //debugger;
      $scope.listItem = response.data;
      console.log(response);
      $scope.total = Number(response.data.length);

      reload();
    });
  };

  $scope.GetHoaDon({
    page: pageIndex,
    pageSize: 10,
  });
  $scope.formatDate = function (params) {
    var updatedAtDate = new Date(params);
    return `${updatedAtDate.getDate()}/${
      updatedAtDate.getMonth() + 1
    }/${updatedAtDate.getFullYear()}`;
  };

  // Reload
  function reload() {
    const navigation = document.querySelector(".navigation");
    console.log(navigation);
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

      // const btnNavigation = document.querySelectorAll("button[data-id]");
      // btnNavigation.forEach(
      //   (item) =>
      //     (item.onclick = () =>
      //       $scope.SeachKhoaHoc({
      //         page: item.dataset.id,
      //         pageSize: 10,
      //       }))
      // );
      // bắt sự kiện các các hàng
      document.querySelectorAll(".course-item").forEach((ele, index) => {
        // Sự kiện xóa khóa học
        const btnDelete = ele.querySelector(".btn-delete-course");
        const btnDetail = ele.querySelector(".btn-detail-course");

        btnDelete.onclick = (e) => $scope.DeleteHoaDon(e.target.dataset.id);
        btnDetail.onclick = (e) => {
          document.querySelector(".lesson_wrapper").style.display = "block";
          document.querySelector(".overlay").style.display = "block";

          $scope.GetByHoaDonID(e.target.dataset.id);
          $scope.lessonHandle();
        };

        // Sự kiện click hàng trong bảng
        ele.onclick = () => {
          // Thêm thông tin của hàng lên các ô input
          const checkBox = ele.querySelector('input[name="orderID[]"]');

          //   // Thêm mã khóa học lên thanh url
          var urlObject = new URL(window.location.href);
          urlObject.searchParams.set("c", checkBox.value);
          window.history.replaceState(null, null, urlObject.toString());
        };

        // Sự kiện nhấn đúp vào một hàng trong bảng
        ele.ondblclick = () => {
          document.querySelector(".lesson_wrapper").style.display = "block";
          document.querySelector(".overlay").style.display = "block";

          GetByHoaDonID(document.querySelector('input[name="orderID"]').value);
          lessonHandle();
        };
      });

      document.querySelectorAll(".lesson_wrapper").forEach((ele) => {
        const btnExit = ele.querySelector(".btn-exit-form");
        btnExit.onclick = (e) => {
          document.querySelector(".lesson_wrapper").style.display = "none";
          document.querySelector(".overlay").style.display = "none";
        };
      });
    }, 1000);
  }

  // Sự kiện nhấn của nút Lưu
  btnCourse.onclick = () =>
    document.getElementById("orderID").value === "0"
      ? $scope.CreateKhoaHoc(formDataObject)
      : $scope.UpdateKhoaHoc(formDataObject);
});

// Sự kiện submit form
form.onsubmit = (e) => {
  e.preventDefault();
  Object.assign(formDataObject, convertFormData(form));
};
