// Hàm đăng nhập
function signIn(form) {
  // Lấy giá trị từ các trường nhập liệu
  var username = form.username.value;
  var password = form.password.value;

  // Lấy danh sách người dùng từ Local Storage
  var userList = getListUser();

  // Kiểm tra xem có tồn tại tài khoản trong danh sách không
  var loggedInUser = userList.find(function (user) {
    return user.username === username && user.password === password;
  });

  // Kiểm tra xem người dùng có phải là admin hay không
  var isAdmin = loggedInUser && loggedInUser.username === "admin";

  // Nếu tồn tại và là admin, đăng nhập thành công
  if (isAdmin) {
    alert("Đăng nhập thành công với tư cách admin!");
    // Chuyển hướng đến trang MainAdmin.html
    window.location.href = "Admin/MainAdmin.html";
  } else if (loggedInUser) {
    // Nếu tồn tại, đăng nhập thành công
    alert("Đăng nhập thành công!");
    // Chuyển hướng đến trang index.html
    window.location.href = "index.html";
  } else {
    // Nếu không tồn tại, thông báo lỗi
    alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
  }

  // Ngăn chặn form được submit và reload trang
  return false;
}

// Hàm lấy danh sách người dùng từ Local Storage
function getListUser() {
  return JSON.parse(window.localStorage.getItem("ListUser")) || [];
}

// Hàm thêm người dùng vào danh sách
function addUser(username, password) {
  var userList = getListUser();
  var newUser = { username: username, password: password };
  userList.push(newUser);
  saveListUser(userList);
}

// Hàm lưu danh sách người dùng vào Local Storage
function saveListUser(userList) {
  window.localStorage.setItem("ListUser", JSON.stringify(userList));
}

// Thêm người dùng admin
addUser("admin", "123");
