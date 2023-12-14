import fetchApi from "./fetchAPI.js";

// hiển thị thông báo
function Notifi({ data }) {
  return `
  <li
  class="header__notification-item header__notification-item--viewed"
>
  <a href="" class="header__notification-link">
    <img
      src="${data.imageTitle}"
      alt=""
      class="header__notification-img"
    />
    <div class="header__notification-info">
      <span class="header__notification-name"
        >${data.title}
      </span>
      <span class="header__notification-descrio"
        >${data.note}
      </span>
    </div>
  </a>
</li>
  `;
}

// // hiển thị thể loại và tên sách
// function HomeTitle({ data }) {
//   return `

//   <a href="#" title="Tới trang chủ">${data.title}</a>
//   `;
// }

// hiển thị chi tiết sản phẩm
function ProDetail({ data }) {
  return `
  <div class="product-content grid__row">
  <div class="product-content-left">
    <div class="product-content-left-big-img">
      <img src="${data.ImageBook}" alt="" />
    </div>

  </div>
  <div class="product-content-right">
    <div class="product-content-right-product-name">
      <h3>${data.Title}</h3>
      <p>
        Nhà xuất bản: <a href="">PiBook</a>
      </p>
      <p>Nhà phát hành: <a href="">PiBook</a></p>
      <p>Tác giả: <a href="">{{IDGenres.authorName}}</a></p>
    </div>
    <div class="product-content-right-product-info">
      <div class="product-info-rating mr-10">
        <span>4.92</span>
        <span style="display: inline-block">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </span>
      </div>
      <div class="product-info-vote mr-10">
        <div class="display-number">25</div>
        vote
      </div>
      <div class="product-info-sell-count mr-10">
        <div class="display-number">27</div>
        đã bán
      </div>
    </div>
    <div class="product-content-right-product-price">
      <p>${data.Price} <sup>đ</sup></p>
    </div>
    <div class="product-content-right-product-quantity">
      <div class="catalog-product-details-discount">
        <div class="product-view-quantity-box d-flex">
          <span>Số lượng:</span>
        </div>
        <div class="product-view-quantity-box-block">
          <a
            ><span class="btnGiam">
              <i class="fa-solid fa-minus"></i> </span
          ></a>
          <span class="quanty-product"> 1 </span>

          <a
            ><span class="btnTang">
              <i class="fa-solid fa-plus"></i> </span
          ></a>
        </div>
      </div>
    </div>
    <div class="product-content-right-product-transport">
      <p>Vận chuyển : <i class="fa-solid fa-truck"></i></p>
      <div class="transport-address">
        <div class="transport-province">
          <select
            name="city"
            id="CityAddressDropdowList"
            class="form-control"
          >
            <option value="00">-- Chọn thành phố --</option>
          </select>
        </div>
        <div class="transport-district">
          <select
            name="district"
            id="CityAddressDropdowList"
            class="form-control"
          >
            <option value="000">-- Chọn quận huyện --</option>
          </select>
        </div>
      </div>
    </div>
    <div class="product-content-right-product-list">
      <ul class="product-list">
        <li class="product-list-item">
          <span>Khối lượng: <strong>300 g</strong></span>
        </li>
        <li class="product-list-item">
          <span>Phí vận chuyển: <strong>15.000d</strong></span>
        </li>
        <li class="product-list-item">
          <span
            ><strong>Tặng Bookmark</strong> lung linh cho tất cả
            các đơn hàng.</span
          >
        </li>
        <li class="product-list-item">
          <span
            ><strong>Tặng Sổ tay</strong> siêu xinh cho đơn hàng
            từ 200K</span
          >
        </li>
        <li class="product-list-item">
          <span
            ><strong>Freeship 5K</strong> cho đơn trên 150K nhập
            mã là <strong>FREE150</strong> . Từ ngày
            01/10-31/10/2023</span
          >
        </li>
        <li class="product-list-item">
          <span
            ><strong>​Freeship 10K</strong> cho đơn trên 250K nhập
            mã là <strong>FREE250</strong> . Từ ngày
            01/10-31/10/2023</span
          >
        </li>
      </ul>
    </div>
  </div>

  <div class="product-cash-btn grid__column-6">
    <button class="btn btn-add-to-cart width-35" >
      <i class="fa-solid fa-cart-shopping"></i>
      Thêm vào giỏ hàng
    </button>

    <button class="btn btn-order width-35" >Mua ngay</button>
  </div>
</div>



  
  `;
}

export { Notifi, ProDetail };
