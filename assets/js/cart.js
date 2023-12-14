const cartView = document.querySelector(".cart-view");

const cartPay = document.querySelector(".payment-view");

// Lấy dữ liệu giỏ hàng từ local storage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const CartItem = ({ data }) => {
  // Hàm để tính số tiền cho mỗi sản phẩm
  function calculateSubtotal(item) {
    return item.Price * item.quantity;
  }

  return `
    <div class="cart-content__item" style="padding-top: 20px">
      <div class="col-3 col-md-2">
        <img src="${data.ImageBook}" class="img-cart" style="width: 120px" />
      </div>
      <div class="col-5 col-md-8">
        <a href="" class="link-title">${data.Title}</a>
        <div class="col-price font-weight-bold" style="padding-top: 16px">
          ${data.Price}
          <p class="text-sm product-price-origin" style="padding-top: 16px"></p>
        </div>
        <div class="catalog-product-details-discount">
          <div class="product-view-quantity-box-block">
            <a>
              <span class="btnGiam">
                <i class="fa-solid fa-minus"></i>
              </span>
            </a>
            <span class="quanty-product">${data.quantity}</span>
            <a>
              <span class="btnTang">
                <i class="fa-solid fa-plus"></i>
              </span>
            </a>
          </div>
          <button class="btn btn-light btnDelete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <span class="text-danger font-weight-bold">${calculateSubtotal(
          data
        )}đ</span>
      </div>
    </div>
  `;
};

const CartPay = () => {
  // Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
  function calculateTotalQuantity(cartItems) {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Hàm để tính tổng tiền của giỏ hàng
  function calculateTotalPrice(cartItems) {
    return cartItems.reduce(
      (total, item) => total + item.Price * item.quantity,
      0
    );
  }

  const totalQuantity = calculateTotalQuantity(cartItems);
  const totalPrice = calculateTotalPrice(cartItems);

  return `
    <div class="payment-view__detail">
      <h5>Thông tin giỏ hàng</h5>
      <div class="text-sm payment-detail">
        <p>
          <label for="">Sản phẩm :</label>
          <strong class="px-3 text-right">${totalQuantity}</strong>
        </p>
        <p>
          <label for="">Tổng tiền :</label>
          <strong class="px-3 text-right">${totalPrice} đ</strong>
        </p>

        <hr style="border-color: rgb(234, 234, 234)" />
        <p>
          <strong class="text-bold text-success">Thanh toán:</strong>
          <strong class="px-3 text-danger text-right text-normal">${totalPrice} đ</strong>
        </p>
      </div>
    </div>
    <div class="button-payment text-right">
    <a style="padding: 10px" class="btn btn-secondary mr-2"
      >Mua tiếp</a
    >
    <button style="padding: 10px" class="btn btn-info">
      Thanh toán
    </button>
  </div>
  `;
};

// Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
function calculateTotalQuantity(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

// Thực hiện các thao tác cần thiết trên dữ liệu giỏ hàng
function updateCartUI() {
  // Đây là nơi bạn có thể thực hiện các thao tác trên giao diện người dùng
  // ví dụ: hiển thị số lượng sản phẩm, tổng giá tiền, ...
  const htmls = cartItems.map((item) => CartItem({ data: item }));
  cartView.innerHTML = htmls.join("");
  const cartPayHtml = CartPay();
  cartPay.innerHTML = cartPayHtml;

  // Lấy tất cả các nút "Tăng" và "Giảm" trong giỏ hàng
  const increaseButtons = document.querySelectorAll(".btnTang");
  const decreaseButtons = document.querySelectorAll(".btnGiam");
  const deleteButtons = document.querySelectorAll(".btnDelete");

  // Thêm sự kiện click cho nút "Tăng"
  increaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Tăng số lượng sản phẩm
      cartItems[index].quantity += 1;
      // Cập nhật lại giỏ hàng và giao diện người dùng
      updateLocalStorageAndUI();
    });
  });

  // Thêm sự kiện click cho nút "Giảm"
  decreaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Giảm số lượng sản phẩm, nhưng đảm bảo không dưới 1
      cartItems[index].quantity = Math.max(1, cartItems[index].quantity - 1);
      // Cập nhật lại giỏ hàng và giao diện người dùng
      updateLocalStorageAndUI();
    });
  });

  // Thêm sự kiện click cho nút "Xóa"
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Xác nhận trước khi xóa sản phẩm
      const confirmed = confirm("Bạn có muốn xóa sản phẩm không?");

      if (confirmed) {
        // Xóa sản phẩm khỏi giỏ hàng
        cartItems.splice(index, 1);
        // Cập nhật lại giỏ hàng và giao diện người dùng
        updateLocalStorageAndUI();
      }
    });
  });

  console.log("Dữ liệu giỏ hàng:", cartItems);

  // Trong hàm updateCartUI, thêm sự kiện click cho nút thanh toán
  const checkoutButton = document.querySelector(".btn.btn-info");
  checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán."
      );
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.location.href = "/pay.html"; // Điều hướng sang trang thanh toán
    }
  });
}

// Hàm cập nhật local storage và giao diện người dùng
function updateLocalStorageAndUI() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartUI();
}

// Gọi hàm để cập nhật giao diện người dùng
updateCartUI();
