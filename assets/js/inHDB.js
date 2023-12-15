document.addEventListener("DOMContentLoaded", function () {
  const userAndCartInfoString = localStorage.getItem("userAndCartInfo");
  const downloadButton = document.getElementById("downloadPdfButton");

  if (userAndCartInfoString) {
    const userAndCartInfo = JSON.parse(userAndCartInfoString);
    const userInfo = userAndCartInfo.userInfo;
    const cartItems = userAndCartInfo.cartItems;

    // Hiển thị thông tin người mua
    displayUserInfo(userInfo);

    // Hiển thị thông tin sản phẩm
    displayCartItems(cartItems);

    // Hiển thị tổng tiền
    displayTotalAmount(cartItems);
    // Thêm sự kiện in PDF khi trang đã được tải
  } else {
    alert("Không tìm thấy dữ liệu người dùng và giỏ hàng.");
    // Xử lý tùy thuộc vào yêu cầu của bạn khi không có dữ liệu
  }
});
function downloadPdf() {
  // Tạo một sự kiện in PDF và mở cửa sổ in của trình duyệt
  window.print();
}

// Trong hàm displayUserInfo
function displayUserInfo(userInfo) {
  updateElementText(".le1", `Tên khách hàng: ${userInfo.hoTen}`);
  updateElementText(".le2", `Địa chỉ: ${userInfo.diaChiGiaoHang}`);
  updateElementText(".le3", `Email: ${userInfo.email}`);
  updateElementText(".le4", `Điện thoại: ${userInfo.soDienThoai}`);
  updateElementText(".le.doi.dam", `Ngày mua: ${getCurrentDate()}`);
}

function displayCartItems(cartItems) {
  const table = document.querySelector("table");

  // Xóa hàng chứa mẫu đi để thêm các hàng mới
  if (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Thêm các hàng mới cho từng sản phẩm trong giỏ hàng
  cartItems.forEach((item) => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = item.Title;
    cell2.textContent = item.quantity;
    cell3.textContent = `${item.Price * item.quantity}đ`;
  });
}

function displayTotalAmount(cartItems) {
  const totalAmountCell = document.querySelector(".dam");

  // Tính tổng tiền
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.Price * item.quantity,
    0
  );

  // Hiển thị tổng tiền trong ô tương ứng
  updateElementText(".dam1", `Tổng tiền hóa đơn bán: ${totalAmount}đ`);
}

function updateElementText(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerText = text;
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
}
