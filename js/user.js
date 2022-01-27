import { createElement } from "./global.js";
import { getCategory } from "./firebase.js";
import { comment } from "./savat.js";
import { createModal } from "./modal.js"
const foodsBtn = document.querySelector(".foodsBtn");
const menuWrapper = document.querySelector("#menuWrapper");
const productsWrapper = document.querySelector(".productsWrapper");

const renderMainPage = (data) => {
  productsWrapper.innerHTML = "";
  menuWrapper.innerHTML = "";
  Object.entries(data).map((item) => {
    const button = createElement("button", "btn foodsBtn", "", menuWrapper);
    const a = createElement("a", "", `${item[0]}`, button);
    a.href = `#${item[0]}`;
    const h2 = createElement("h2", "text-uppercase", ` ${item[1].category}`, productsWrapper);
    h2.id = `${item[1].category}`;
    const cardRowDiv = createElement(
      "div",
      "row mt-3 mb-5",
      "",
      productsWrapper
    );
    Object.values(item[1]).map((el) => {
      if (typeof el === "object") {
        const cardColDiv = createElement(
          "div",
          "col-xl-3 col-md-4 col-6",
          "",
          cardRowDiv
        );
        const cardDiv = createElement("div", "foodCard", "", cardColDiv);
        const imgDiv = createElement("div", "imgCard", "", cardDiv);
        const imgFood = createElement("img", "w-100", ` ${el.url}`, imgDiv);
        imgFood.src = `${el.url}`;

        const imgBtnDiv = createElement("div", "w-100 blackDrop p-2 text-end", "", imgDiv);
        const imgBtn = createElement("button", "btn btn-yellow", "", imgBtnDiv);
        imgBtn.innerHTML = "Qo'shish";
        const titleDiv = createElement("div", "mt-3", "", cardDiv);
        const titleName = createElement("p", "fw-bold", `${el.name}`, titleDiv);

        let dotPrice = el.price;

        console.log(dotPrice);

        dotPrice = el.price / 1000 + "," + ((el.price % 1000 !== 0) ? el.price % 1000 : `000`) + " so'm";
        const price = createElement("p", "mb-2", dotPrice, titleDiv);
        imgBtn.onclick = () => {
          createModal(`${el.url}`, comment, el.price, `${el.name}`);
        }
      }
    });
  });
};
getCategory(renderMainPage);
foodsBtn &&
  foodsBtn.addEventListener("submit", (e) => {
    e.preventDefault();
  });
