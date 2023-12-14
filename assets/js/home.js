import { home, Menu, Notifi } from "./homeService.js";
import fetchApi from "./fetchAPI.js";

// thông báo
const contentNotifi = document.querySelector(".header__notification-list");

// danh mục
const contentMenu = document.querySelector(".category__list");

// giao diện home
const contentMain = document.querySelector(".content__main");

// lấy dữ liệu từ db.json " home" Sách
const books = await fetchApi.get("/home").then((response) => {
  return response.json();
});

// lấy dữ liệu từ db.json " home" menu
const menus = await fetchApi.get("/menu").then((response) => {
  return response.json();
});

//lấy dữ liệu từ ds.json "home" Notifi
const notifis = await fetchApi.get("/notifi").then((response) => {
  return response.json();
});

// render ra dữ liệu từ home
const htmls = books.map((book) => home({ data: book }));
contentMain.innerHTML += htmls.join("");

// render ra dữ liệu danh mục
const htmlgenre = menus.map((menu) => Menu({ data: menu }));
contentMenu.innerHTML += htmlgenre.join("");

// render ra dữ liệu thông báo
const htmlNotifi = notifis.map((notifi) => Notifi({ data: notifi }));
contentNotifi.innerHTML = htmlNotifi.join("");
