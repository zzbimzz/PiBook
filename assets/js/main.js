let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
const productItems = [
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/d/n/dntttttuntitled.jpg)",
    name: "Đắc Nhân Tâm",
    priceOld: "1.000.000đ",
    priceNew: "500.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/9/7/9726a839a056959e94aba54e7c1ff0d6_1_1.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/2/1/210723-8.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/8/9/8935235220324_11.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/u/n/untitledthaotungtamly.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/z/4/z4118763446785_cf4bc22d353b065bbb37e686de1f9207.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/t/d/tdcsvnsh.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/8/9/8936067605693.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
  {
    img: "url(https://cdn0.fahasa.com/media/catalog/product/i/m/image_217480.jpg)",
    name: "Nhà Giả Kim",
    priceOld: "999.999đ",
    priceNew: "499.000đ",
    icon: '<i fa-solid fa-star"></i>',
    iconLove: '<i class="fa-solid fa-check"></i>',
    sale: "10%",
  },
];
const listItem = document.querySelector(".list-Item.grid__row");
const htmls = productItems.map((productItem) => {
  return `
  <div class="grid__column-2-4">
  <a href="" class="home-product-all">
    <div class="home-product-item">
      <div
        class="home-product-item__img"
        style="
          background-image: ${productItem.img};
        "
      ></div>
      <h4 class="home-product-item__name">${productItem.name}</h4>
      <div class="home-product-item__price">
        <span class="home-product-item__price-old"
          >${productItem.priceOld}
        </span>
        <span class="home-product-item__price-current"
          >${productItem.priceNew}
        </span>
      </div>
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
        ${productItem.iconLove}
        <span> Yêu thích</span>
      </div>
      <div class="home-product-item__sale-up">
        <span class="home-product-item__sale-up-percent"
          >${productItem.sale}</span
        >
      </div>
    </div>
  </a>
</div>

  `;
});
listItem.innerHTML = htmls.join("");
