// Đối tượng User
function User(name, email, phone, address, username, password) {
  this.name = name;
  this.email = email;
  this.phone = phone;
  this.address = address;
  this.username = username;
  this.password = password;
}

// Hàm lấy danh sách người dùng từ localStorage
function getListUser() {
  return JSON.parse(window.localStorage.getItem("ListUser")) || [];
}

// Hàm đăng ký
function signUp(form) {
  // Lấy các giá trị từ các trường nhập liệu
  var name = form.name.value;
  var email = form.email.value;
  var phone = form.phone.value;
  var address = form.address.value;
  var userName = form.userName.value;
  var passWord = form.passWord.value;

  // Kiểm tra xem có đủ thông tin hay không
  if (!name || !email || !phone || !address || !userName || !passWord) {
    alert("Vui lòng nhập đủ thông tin.");
    return false; // Ngăn chặn form được submit
  }

  // Tạo đối tượng User mới
  var newUser = new User(name, email, phone, address, userName, passWord);

  // Lấy danh sách người dùng từ localStorage
  var listUser = getListUser();

  // Kiểm tra xem tài khoản đã tồn tại chưa
  for (var user of listUser) {
    if (user.username === newUser.username) {
      alert("Tài khoản đã tồn tại.");
      return false; // Ngăn chặn form được submit
    }
  }

  // Thêm người dùng mới vào danh sách
  listUser.push(newUser);

  // Lưu danh sách người dùng vào localStorage
  window.localStorage.setItem("ListUser", JSON.stringify(listUser));

  /// Thông báo đăng ký thành công và hỏi người dùng có muốn đến trang đăng nhập không
  var confirmLogin = confirm(
    "Đăng ký thành công! Bạn có muốn đến trang đăng nhập không?"
  );

  // Nếu người dùng chọn "OK", chuyển hướng đến trang đăng nhập
  if (confirmLogin) {
    window.location.href = "login.html";
  }

  // Ngăn chặn form được submit và reload trang
  return false;
}
