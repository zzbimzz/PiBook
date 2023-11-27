import convertFormData from "../../../../assets/js/convertFormData.js";

const form = document.forms["form-course"];
const btnCourse = document.querySelector("#btn-course");

const formDataObject = {};
let total = 0;

var app = angular.module("AppBanHang", []);
app.controller("HoaDonBanCtrl", function ($scope, $http) {
  // Tạo khóa học
  // $scope.CreateKhoaHoc = function (data) {
  //   console.log("create");

  //   $http({
  //     method: "POST",
  //     data,
  //     url: API + "/api-admin/course/create-course",
  //   }).then(function (response) {
  //     alert("Bạn thêm khóa học thành công");
  //     location.reload();
  //   });
  // };

  // Cập nhật khóa học
  // $scope.UpdateKhoaHoc = function (data) {
  //   console.log("update");

  //   $http({
  //     method: "PATCH",
  //     data,
  //     url: API + "/api-admin/course/update-course",
  //   }).then(function (response) {
  //     alert("Bạn sửa khóa học thành công");

  //     location.reload();
  //   });
  // };

  //Xóa hóa đơn
  $scope.DeleteKhoaHoc = function (id) {
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

  $scope.GetKhoaHoc = function (id) {
    $http({
      url: current_url + "/api-admin/oders/get-by-id/" + id,
      method: "GET",
    }).then(function (response) {
      $scope.chitiethoadon = response.data.list_json_chitiethoadon123;
      console.log(response);
    });
  };

  // Tìm kiếm khóa học
  let pageIndex = 1;
  $scope.listItem;
  $scope.SeachKhoaHoc = function (data) {
    $http({
      method: "POST",
      data,
      url: current_url + "/api-admin/oders/search",
    }).then(function (response) {
      // debugger;
      $scope.listItem = response.data;
      total = Number(response.data.totalItems);
      reload();
    });
  };

  $scope.SeachKhoaHoc({
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

      const btnNavigation = document.querySelectorAll("button[data-id]");
      btnNavigation.forEach(
        (item) =>
          (item.onclick = () =>
            $scope.SeachKhoaHoc({
              page: item.dataset.id,
              pageSize: 10,
            }))
      );
      // bắt sự kiện các các hàng
      document.querySelectorAll(".course-item").forEach((ele, index) => {
        // Sự kiện xóa khóa học
        const btnDelete = ele.querySelector(".btn-delete-course");
        const btnDetail = ele.querySelector(".btn-detail-course");

        btnDelete.onclick = (e) => DeleteKhoaHoc(e.target.dataset.id);
        btnDetail.onclick = (e) => {
          document.querySelector(".lesson_wrapper").style.display = "block";
          document.querySelector(".overlay").style.display = "block";

          $scope.GetKhoaHoc(e.target.dataset.id);
          //$scope.lessonHandle();
        };

        // Sự kiện click hàng trong bảng
        ele.onclick = () => {
          // Thêm thông tin của hàng lên các ô input
          const checkBox = ele.querySelector('input[name="orderID_Os[]"]');

          //   // Thêm mã khóa học lên thanh url
          var urlObject = new URL(window.location.href);
          urlObject.searchParams.set("c", checkBox.value);
          window.history.replaceState(null, null, urlObject.toString());
        };

        // Sự kiện nhấn đúp vào một hàng trong bảng
        ele.ondblclick = () => {
          document.querySelector(".lesson_wrapper").style.display = "block";
          document.querySelector(".overlay").style.display = "block";

          GetKhoaHoc(document.querySelector('input[name="courseId"]').value);
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
    document.getElementById("courseId").value === "0"
      ? $scope.CreateKhoaHoc(formDataObject)
      : $scope.UpdateKhoaHoc(formDataObject);
});

// Sự kiện submit form
form.onsubmit = (e) => {
  e.preventDefault();
  Object.assign(formDataObject, convertFormData(form));
};
