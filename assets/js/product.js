const nutgiam = document.querySelector(".btnGiam");
const nuttang = document.querySelector(".btnTang");
const numberProduct = document.querySelector(".quanty-product");

let number = 0;
nuttang.onclick = () => {
  number += 1;
  numberProduct.innerHTML = `${number}`;
  console.log(number);
};
nutgiam.onclick = () => {
  if (number > 0) {
    number -= 1;
    numberProduct.innerHTML = `${number}`;
  }
};
