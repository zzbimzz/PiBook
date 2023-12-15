document.addEventListener("DOMContentLoaded", function () {
  const btnThanhToan = document.getElementById("btnThanhToan");
  const hoTenInput = document.getElementById("hoTen");
  const emailInput = document.getElementById("email");
  const soDienThoaiInput = document.getElementById("soDienThoai");
  const diaChiGiaoHangInput = document.getElementById("diaChiGiaoHang");
  const payCheck = document.querySelector(".paycheck");

  // Lấy dữ liệu giỏ hàng từ local storage
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Hàm kiểm tra xem tất cả các trường đã được nhập đủ chưa
  function areFieldsValid() {
    return (
      hoTenInput.value.trim() !== "" &&
      emailInput.value.trim() !== "" &&
      soDienThoaiInput.value.trim() !== "" &&
      diaChiGiaoHangInput.value.trim() !== ""
    );
  }

  // Hàm để tính số tiền cho mỗi sản phẩm
  function calculateSubtotal(item) {
    return item.Price * item.quantity;
  }

  // Hàm để tính tổng tiền của giỏ hàng
  function calculateTotalPrice() {
    return cartItems.reduce(
      (total, item) => total + item.Price * item.quantity,
      0
    );
  }

  // Hàm để hiển thị mỗi sản phẩm trong giỏ hàng
  function renderCartItem(item) {
    return `
      <div class="cart-item row">
        <div class="cart-item-img col-3">
          <img src="${item.ImageBook}" alt="" class="img-fluid mx-auto" />
        </div>
        <div class="cart-item-title-quantity col-md-7">
          <p class="text-sm">
            <a class="text-dark" href="">${item.Title}</a>
          </p>
          <p class="text-sm text-info">${item.quantity} x ${item.Price}</p>
        </div>
        <div class="cart-item-price col-md-2">
          <p class="text-sm text-right text-danger">${calculateSubtotal(
            item
          )}đ</p>
        </div>
      </div>
    `;
  }

  // Hàm để cập nhật giao diện người dùng
  function updateCartUI() {
    const htmls = cartItems.map((item) => renderCartItem(item));
    payCheck.innerHTML = htmls.join("");

    // Hiển thị thông tin giỏ hàng và tổng thanh toán
    const cartPayHtml = `
      <div class="cart-pay">
        <div class="row text-sm" style="margin-bottom: 10px">
          <div class="col-4">
            <strong>Tổng giá: </strong>
          </div>
          <div class="col-8 text-right">
            <strong>${calculateTotalPrice()}đ</strong>
          </div>
        </div>
  
        <div class="row text-sm">
          <div class="col-4">
            <strong>Vận chuyển: </strong>
          </div>
          <div class="col-8 text-right">
            <strong>0đ</strong>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-8 offset-4 text-right">
          <strong class="text-danger">${calculateTotalPrice()}đ</strong>
        </div>
      </div>
    `;

    payCheck.innerHTML += cartPayHtml;
  }

  // Sự kiện click của nút "Thanh toán"
  // Sự kiện click của nút "Thanh toán"
  btnThanhToan.addEventListener("click", function () {
    // Kiểm tra xem tất cả các trường đã được nhập đủ chưa
    if (!areFieldsValid()) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }

    // Kiểm tra xem đã chọn ít nhất một phương thức thanh toán chưa
    const paymentMethods = document.getElementsByName("paymentMethod");
    let selectedPaymentMethod = false;
    for (let i = 0; i < paymentMethods.length; i++) {
      if (paymentMethods[i].checked) {
        selectedPaymentMethod = true;
        break;
      }
    }

    if (!selectedPaymentMethod) {
      alert("Vui lòng chọn ít nhất một phương thức thanh toán.");
      return;
    }

    // Tạo đối tượng chứa thông tin cá nhân của người dùng
    const userInfo = {
      hoTen: hoTenInput.value.trim(),
      email: emailInput.value.trim(),
      soDienThoai: soDienThoaiInput.value.trim(),
      diaChiGiaoHang: diaChiGiaoHangInput.value.trim(),
    };

    // Lấy dữ liệu giỏ hàng từ local storage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Đối tượng chứa thông tin người dùng và giỏ hàng
    const userAndCartInfo = {
      userInfo: userInfo,
      cartItems: cartItems,
    };

    // Lưu đối tượng vào local storage
    localStorage.setItem("userAndCartInfo", JSON.stringify(userAndCartInfo));

    // Nếu đã nhập đủ và chọn ít nhất một phương thức thanh toán, chuyển trang sang inHDB.html
    window.location.href = "inHDB.html";
  });

  // Gọi hàm để cập nhật giao diện người dùng
  updateCartUI();
});
