import { Home, Menu, Notifi } from "./homeService.js";
import { home, menu, notifi } from "./data.js";
//import fetchApi from "./fetchAPI.js";

// thông báo
const contentNotifi = document.querySelector(".header__notification-list");

// danh mục
const contentMenu = document.querySelector(".category__list");

// giao diện home
const contentMain = document.querySelector(".content__main");
console.log(home);
// lấy dữ liệu từ db.json " home" Sách

const books = home;
console.log(menu);
// lấy dữ liệu từ db.json " home" menu
const menus = menu;
console.log(notifi);
//lấy dữ liệu từ ds.json "home" Notifi
const notifis = notifi;

// render ra dữ liệu từ home
const htmls = books.map((book) => Home({ data: book }));
contentMain.innerHTML += htmls.join("");

// render ra dữ liệu danh mục
const htmlgenre = menus.map((menu) => Menu({ data: menu }));
contentMenu.innerHTML += htmlgenre.join("");

// render ra dữ liệu thông báo
const htmlNotifi = notifis.map((notifi) => Notifi({ data: notifi }));
contentNotifi.innerHTML = htmlNotifi.join("");
