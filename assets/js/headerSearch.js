import { home } from "./data.js";

let data = [];

home.forEach((x) => {
  data = [...data, ...x.listBooks];
});
console.log(data);
const searchInput = document.querySelector(".header__search-input-text");
const listSearch = document.querySelector(".header__search-list");

searchInput.onchange = () => {
  const value = searchInput.value;

  let books = data.filter((x) => x.Title.includes(value));
  console.log(books);
  searchInput.value === "" ? (data = []) : "";
  //   document.querySelector(".searchCount").innerText = data.length + " kết quả";

  const htmls = books.map(
    (book) => `
  <li class="header__search-list-item">
  <a href="/product.html?id=${book.BookID}">${book.Title}</a>
</li>`
  );
  listSearch.innerHTML = htmls.join("");
};
