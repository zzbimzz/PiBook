import { notifi } from "./data.js";
// thông báo
const contentNotifi = document.querySelector(".header__notification-list");

//lấy dữ liệu từ ds.json "home" Notifi
const notifis = notifi;

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

// render ra dữ liệu thông báo
const htmlNotifi = notifis.map((notifi) => Notifi({ data: notifi }));
contentNotifi.innerHTML = htmlNotifi.join("");
