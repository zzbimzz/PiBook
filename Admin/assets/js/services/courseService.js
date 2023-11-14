import convertFormData from '../../../../assets/js/utils/convertFormData.js';

const form = document.forms['form-course'];
const btnCourse = document.querySelector('#btn-course');

const formDataObject = {};
let total = 0;

var app = angular.module('AppHocTap', []);
app.controller('CourseCtrl', function ($scope, $http) {
    // Tạo khóa học
    $scope.CreateKhoaHoc = function (data) {
        console.log('create');

        $http({
            method: 'POST',
            data,
            url: API + '/api-admin/course/create-course',
        }).then(function (response) {
            alert('Bạn thêm khóa học thành công');
            location.reload();
        });
    };

    // Cập nhật khóa học
    $scope.UpdateKhoaHoc = function (data) {
        console.log('update');

        $http({
            method: 'PATCH',
            data,
            url: API + '/api-admin/course/update-course',
        }).then(function (response) {
            alert('Bạn sửa khóa học thành công');

            location.reload();
        });
    };

    // Xóa khóa học
    $scope.DeleteKhoaHoc = function (id) {
        console.log('delete');

        confirm('Bạn có chắc chắn muốn xóa?') &&
            $http({
                method: 'DELETE',
                url: API + '/api-admin/course/delete-course?id=' + id,
            }).then(function (response) {
                location.reload();
                alert('Bạn xóa thành công.');
            });
    };

    // Tìm kiếm khóa học
    let pageIndex = 1;
    $scope.listItem;
    $scope.SeachKhoaHoc = function (data) {
        $http({
            method: 'POST',
            data,
            url: API + '/api-admin/course/get-course',
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

    // Reload
    function reload() {
        setTimeout(() => {
            // Navigation
            const totalPages = Math.ceil(total / 10);
            document.querySelector('.navigation').innerHTML = '';
            for (let index = 0; index < totalPages; index++) {
                document.querySelector('.navigation').innerHTML += `
                    <button data-id="${index + 1}" class="btn-primary">${index + 1}</button>
                `;
            }

            const btnNavigation = document.querySelectorAll('button[data-id]');
            btnNavigation.forEach(
                (item) =>
                    (item.onclick = () =>
                        $scope.SeachKhoaHoc({
                            page: item.dataset.id,
                            pageSize: 10,
                        })),
            );

            document.querySelectorAll('.course-item').forEach((ele) => {
                const btnDelete = ele.querySelector('.btn-delete-course');
                btnDelete.onclick = (e) => $scope.DeleteKhoaHoc(e.target.dataset.id);
                ele.onclick = (e) =>
                    (document.querySelector('#courseId').value = ele.querySelector('input[name="courseIds[]"]').value);
            });
        }, 1000);
    }

    // Sự kiện nhấn của nút Lưu
    btnCourse.onclick = () =>
        document.getElementById('courseId').value === '0'
            ? $scope.CreateKhoaHoc(formDataObject)
            : $scope.UpdateKhoaHoc(formDataObject);
});

form.onsubmit = (e) => {
    e.preventDefault();
    Object.assign(formDataObject, convertFormData(form));
};
