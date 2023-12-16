import fetchApi from "./fetAPI.js";

import BookList from "./sanphamService.js";

// giao diện home
const contentMain = document.querySelector(".table tbody");
// lấy dữ liệu từ db.json " home" Sách
const booklists = await fetchApi.get("/home").then((response) => {
  return response.json();
});

let books = [];

booklists.forEach((item) => {
  books = [...books, ...item.listBooks];
});

// render ra dữ liệu từ home
const htmls = books.map((bookList) => BookList({ data: bookList }));
contentMain.innerHTML += htmls.join("");
