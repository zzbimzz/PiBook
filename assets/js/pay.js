const payCheck = document.querySelector(".paycheck");

// Lấy dữ liệu giỏ hàng từ local storage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const Pay = () => {
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

  // Gọi hàm để cập nhật giao diện người dùng
  updateCartUI();
};

// Gọi hàm Pay để khởi tạo
Pay();
