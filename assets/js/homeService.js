//import fetchApi from "./fetchAPI.js";

// hiển thị ra các thông tin sách
function bookItem({ data }) {
  return `
      <div class="grid__column-2-4 home-product-item product-item col l-2 m-5 c-12">
      <!-- <div class="home-product-item__img"></div> -->
      <a href="/product.html?id=${data.BookID}">
        <img src="${data.ImageBook}" alt="" />
        <a
          class="home-product-item__name"
          href=""
          title="Màn hình máy tính MSI Optix MAG322CQRV Cong 2K 144Hz"
          >${data.Title} </a
        ><br />
        <span class="home-product-item__price-old"
          >12.500.000₫</span
        ><span class="home-product-item__price-current"
          ><b>${data.Price}</b></span
        >
      </a>
      <div class="home-product-item__action">
        <div class="home-product-item__rating">
          <i
            class="home-product-item__star--gold fa-solid fa-star"
          ></i>
          <i
            class="home-product-item__star--gold fa-solid fa-star"
          ></i>
          <i
            class="home-product-item__star--gold fa-solid fa-star"
          ></i>
          <i
            class="home-product-item__star--gold fa-solid fa-star"
          ></i>
          <i
            class="home-product-item__star--gold fa-solid fa-star"
          ></i>
        </div>
      </div>
      <div class="home-product-item__favorite">
        <i class="fa-solid fa-check"></i>
        <span> Yêu thích</span>
      </div>
      <div class="home-product-item__sale-up">
        <span class="home-product-item__sale-up-percent"
          >-10%</span
        >
      </div>
    </div>
      `;
}

// hiển thị ra các header sách
function Home({ data }) {
  return `
  <div class="main-product">
    <h2 class="main-product-text main-backgr">${data.title}</h2>
    <div class="main-menu">
      <h4 class="main-menu-text">
        <a href="" class="main-menu-link btn">Deal hot trong ngày</a>
      </h4>
      <h4 class="main-menu-text">
        <a href="" class="main-menu-link btn">Sách hot/Giảm sốc</a>
      </h4>
    </div>
    <div class="main-product-list">
      <div class="list-Item grid__row" style="justify-content: space-between;">
    ${data.listBooks.map((book) => bookItem({ data: book }))}
      </div>
      <div class="home-product-btn">
        <button  class="home-btn-link btn">Xem thêm </button>
      </div>
    </div>
  </div>
    `;
}

// hiện thị các danh mục tác giả và thể loại
function Menu({ data }) {
  return `
  <li class="category__item category__item-active has-submenu">
  <a href="#" class="category__item-link"> ${data.title} </a>
  <div
    class="megasubmenu dropdown-menu"
    style="width: 1000px"
  >
    <div class="grid__row">
      <div class="submenu-item">
        <ul class="submenu-item-list">
        ${data.listMenus.map((item) => Genre({ data: item })).join("")}
        </ul>
      </div>
    </div>
  </div>
</li>
  `;
}

function Genre({ data }) {
  return `
  <li>${data.genreName}</li>
  `;
}

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

export { Home, Menu, Notifi };
