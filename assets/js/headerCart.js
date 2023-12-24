const cart = JSON.parse(localStorage.getItem("cart")) || [];

const headerCartList = document.querySelector(".header__cart-list-item");

const html = cart
  .map(
    (x) => `
    <li class="header__cart-item">
      <img
        src="${x.ImageBook}"
        alt=""
        class="header__cart-img"
      />
      <div class="header__cart-item-info">
        <div class="header__cart-item-head">
          <h5 class="header__cart-item-name">${x.Title}</h5>
          <div class="header__cart-item-price-wrap">
            <span class="header__cart-item-price">
            ${x.Price}</span
            >

            <span class="header__cart-item-multiply"
              >x</span
            >
            <span class="header__cart-item-quantity"
              >${x.quantity}</span
            >
          </div>
        </div>
        <div class="header__cart-item-body">
          <span class="header__cart-item-description"
            >Chi tiết</span
          >
          <span class="header__cart-item-remove"
            >Xóa</span
          >
        </div>
      </div>
    </li>
`
  )
  .join("");

headerCartList.innerHTML = html;
