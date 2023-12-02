import convertFormData from "../convertFormData.js";
const searchInput = document.querySelector(".header__search-input-text");

const bookID = document.querySelector("#bookID");
const title = document.querySelector("#title");
const imageBook = document.querySelector("#imageBook");
const stock = document.querySelector("#stock");
const price = document.querySelector("#price");
const authorID = document.querySelector("#authorID");
const genreID = document.querySelector("#genreID");
const supplierID = document.querySelector("#supplierID");

const form = document.forms["form-course"];

const btnBook = document.querySelector("#btn-course");

const formDataObject = {};
let total = 0;

var app = angular.module("AppBanHang", []);
app.controller("BookCtrl", function ($scope, $http) {
  // Tạo sản phẩm
  $scope.CreateSanPham = function (data) {
    console.log("create");

    $http({
      method: "POST",
      data,
      url: current_url + "/api-admin/books/create-book",
    }).then(function (response) {
      alert("Bạn thêm sản phẩm thành công");
      location.reload();
    });
  };

  // Cập nhật sản phẩm
  $scope.UpdateSanPham = function (data) {
    console.log("update");

    $http({
      method: "PATCH",
      data,
      url: current_url + "/api-admin/books/update-book",
    }).then(function (response) {
      alert("Bạn sửa sản phẩm thành công");

      location.reload();
    });
  };

  // Xóa sản phẩm
  $scope.DeleteSanPham = function (id) {
    console.log("delete");

    confirm("Bạn có chắc chắn muốn xóa?") &&
      $http({
        method: "DELETE",
        url: current_url + "/api-admin/books/delete-book?id=" + id,
      }).then(function (response) {
        location.reload();
        alert("Bạn xóa thành công.");
      });
  };

  // Tìm kiếm sản phẩm
  let pageIndex = 1;
  $scope.listItem;
  $scope.SeachSanPham = function (data) {
    $http({
      method: "POST",
      data,
      url: current_url + "/api-admin/books/search",
    }).then(function (response) {
      //debugger;
      $scope.listItem = response.data;
      total = Number(response.data.totalItems);

      reload(response.data.data);
    });
  };

  $scope.SeachSanPham({
    page: pageIndex,
    pageSize: 10,
  });
  searchInput.onchange = () => {
    if (searchInput.value !== "") {
      $scope.SeachSanPham({
        page: 1,
        pageSize: 10,
        Title: searchInput.value,
      });
    }
  };

  // Reload
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
      btnNavigation.forEach(
        (item) =>
          (item.onclick = () =>
            $scope.SeachSanPham({
              page: item.dataset.id,
              pageSize: 10,
            }))
      );

      document.querySelectorAll(".course-item").forEach((ele, index) => {
        const btnDelete = ele.querySelector(".btn-delete-course");
        btnDelete.onclick = (e) => $scope.DeleteSanPham(e.target.dataset.id);
        ele.onclick = (e) => {
          //debugger;
          const checkBox = ele.querySelector('input[name="bookIds[]"]');

          bookID.value = checkBox.value;
          title.value = data[index].title;
          imageBook.value = data[index].imageBook;
          price.value = data[index].price;
          stock.value = data[index].stock;
          authorID.value = data[index].authorID;
          genreID.value = data[index].genreID;
          supplierID.value = data[index].supplierID;

          var urlObject = new URL(window.location.href);
          urlObject.searchParams.set("c", checkBox.value);
          window.history.replaceState(null, null, urlObject.toString());
        };
      });
    }, 1000);
  }

  // Sự kiện nhấn của nút Lưu
  btnBook.onclick = () =>
    document.getElementById("bookID").value === "0"
      ? $scope.CreateSanPham(formDataObject)
      : $scope.UpdateSanPham(formDataObject);
});

form.onsubmit = (e) => {
  e.preventDefault();
  Object.assign(formDataObject, convertFormData(form));
  //console.log(convertFormData(form));
};
