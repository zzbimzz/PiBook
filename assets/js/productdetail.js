import { Notifi, ProDetail } from "./prodetailService.js";
import fetchApi from "./fetchAPI.js";

// lấy id của sản phẩm
var urlObject = new URL(window.location.href);
var id = urlObject.searchParams.get("id");
console.log(id);

// thông báo
const contentNotifi = document.querySelector(".header__notification-list");
//lấy dữ liệu từ ds.json "home" Notifi
const notifis = await fetchApi.get("/notifi").then((response) => {
  return response.json();
});
// render ra dữ liệu thông báo
const htmlNotifi = notifis.map((notifi) => Notifi({ data: notifi }));
contentNotifi.innerHTML = htmlNotifi.join("");

// // // hometitle
// const contentHomeTitle = document.querySelector(".home-item");
// const hometitles = await fetchApi.get("/home").then((response) => {
//   return response.json();
// });
// // //render
// const htmlHomeTitle = hometitles.map((hometitle) =>
//   HomeTitle({ data: hometitle })
// );
// contentHomeTitle.innerHTML += htmlHomeTitle.join("");

// Chi tiết sản phẩm
const contentProduct = document.querySelector(".product-content");

// Lấy dữ liệu từ API
const response = await fetchApi.get("/home");
const products = await response.json();

// Lọc sản phẩm theo id
const product = products
  .map((home) => home.listBooks)
  .flat()
  .find((book) => book.BookID === parseInt(id));

console.log(product);

// Đảm bảo rằng hàm addToCart được định nghĩa trước khi sử dụng nó
function addToCart(product) {
  // Lấy danh sách sản phẩm từ localStorage (nếu có)
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra nếu cartItems không phải là mảng, khởi tạo lại là mảng rỗng
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItem = cartItems.find((book) => book.BookID === product.BookID);

  if (existingItem) {
    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
    existingItem.quantity += 1;
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào danh sách
    cartItems.push({ ...product, quantity: 1 });
  }

  // Cập nhật giỏ hàng trong localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Sản phẩm đã được thêm vào giỏ hàng:", product);
}

// Kiểm tra nếu sản phẩm không tồn tại
if (!product) {
  console.error("Sản phẩm không tồn tại");
} else {
  // Render sản phẩm
  contentProduct.innerHTML = ProDetail({ data: product });

  // Thêm sự kiện cho nút "Thêm vào giỏ hàng"
  const addToCartBtn = document.querySelector(".btn-add-to-cart");
  addToCartBtn.addEventListener("click", function () {
    // Thêm sản phẩm vào giỏ hàng
    addToCart(product);
    const confirmed = confirm(
      "Sản phẩm đã được thêm vào giỏ hàng. Bạn có muốn đến giỏ hàng không?"
    );

    // Nếu người dùng xác nhận, chuyển hướng đến trang giỏ hàng
    if (confirmed) {
      window.location.href = "/cart.html"; // Thay đổi đường dẫn dựa trên cấu trúc của trang web của bạn
    }
  });

  // Thêm sự kiện cho nút "Mua ngay"
  const buyNowBtn = document.querySelector(".btn-order");
  buyNowBtn.addEventListener("click", function () {
    // Thêm sản phẩm vào giỏ hàng
    addToCart(product);
    const confirmed = confirm(
      "Sản phẩm đã được thêm vào giỏ hàng. Bạn có muốn đến giỏ hàng không?"
    );

    // Nếu người dùng xác nhận, chuyển hướng đến trang giỏ hàng
    if (confirmed) {
      window.location.href = "/cart.html"; // Thay đổi đường dẫn dựa trên cấu trúc của trang web của bạn
    }

    // Thực hiện các bước khác liên quan đến quá trình mua ngay (nếu cần)
  });
}
