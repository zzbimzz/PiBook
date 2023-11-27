// const btnAvatar = document.querySelector(".header_actions-avatar");
// const userMenu = document.querySelector("#userMenu");

// let isExpanded = false;
// let target;

// const actions = [btnAvatar];
// const elementsExpanded = [userMenu];
// // Handle event actions click
// actions.forEach((action, index) => {
//   action.onclick = function (e) {
//     if (e.target === target) {
//       isExpanded = !isExpanded;
//       const nextElement = e.target.nextElementSibling;

//       e.target.ariaExpanded = isExpanded ? true : false;
//       nextElement.ariaHidden = isExpanded ? false : true;

//       nextElement.style.display =
//         nextElement.style.display === "block" ? "none" : "block";
//       target = null;
//       return;
//     }

//     elementsExpanded.forEach((item, i) => {
//       isExpanded = false;
//       actions[i].ariaExpanded = false;
//       item.ariaHidden = true;
//       item.style.display = "none";
//     });

//     isExpanded = !isExpanded;
//     action.ariaExpanded = isExpanded;
//     elementsExpanded[index].ariaHidden = !isExpanded;

//     target = e.target;
//     if (isExpanded) {
//       elementsExpanded[index].style.display = "block";
//       return;
//     }
//     elementsExpanded[index].style.display = "none";
//   };
// });

// document.onclick = function (e) {
//   const elementsToCheckExpanded = [...actions, ...elementsExpanded];
//   if (
//     elementsToCheckExpanded.includes(e.target.closest(".header_actions-avatar"))
//   ) {
//     target = e.target.closest(".header_actions-avatar");
//     return;
//   }

//   if (!e.target.closest("#userMenu")) {
//     isExpanded = false;
//     btnAvatar.ariaExpanded = false;
//     userMenu.ariaHidden = true;
//     userMenu.style.display = "none";
//     target = null;
//   }
// };

// const inputName = document.querySelector("#nameCourse");
// const inputSlug = document.querySelector("#slug");

// inputName.onblur = () => {
//   const newValue = inputName.value;
//   inputSlug.value = nameToSlug(newValue);
// };
