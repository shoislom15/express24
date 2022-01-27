import { addOrder } from "./firebase.js";
import { comment, savat } from "./savat.js";
import { userData } from "./userData.js";

const quantity = document.getElementById("modalQuantity");
const modalTotalPrice = document.getElementById("modalTotalPrice");
// const myprice = parseInt(parseInt(document.getElementById("modalTotalPrice").value) / parseInt(document.getElementById("modalQuantity").value));
let myprice = 3000;
const modal = document.getElementById("modal");
const modalQoshish = document.getElementById("modalQoshish")

// Modal inner
const modalImg = document.getElementById("modalImg");
const modalComment = document.getElementById("modalComment");
const modalTitle = document.getElementById("modalTitle")

// Btns
const modalMinusBtn = document.getElementById("modalMinusBtn");
const modalPlusBtn = document.getElementById("modalPlusBtn");
const hideModal = document.getElementById("hideModal");


const createModal = (img, comment, newPrice, title) => {
    console.log(modalTotalPrice);


    modalImg.src = img;
    modalComment.innerHTML = comment;
    modalTotalPrice.value = newPrice;
    console.log(myprice);
    modalTitle.value = title;

    quantity.value = 1;
    myprice = newPrice;

    modal.classList.remove("d-none")
}

modalPlusBtn.onclick = () => {
    console.log(quantity);
    console.log(myprice);
    let currenet = parseInt(quantity.value);

    quantity.value = currenet + 1;

    modalTotalPrice.value = (currenet + 1) * myprice;
}

modalMinusBtn.onclick = () => {
    console.log(quantity);
    console.log(myprice);
    let currenet = parseInt(quantity.value);

    if (currenet >= 2) {
        quantity.value = currenet - 1;

        modalTotalPrice.value = (currenet - 1) * myprice;
    }
}

hideModal.onclick = () => {
    modal.classList.add("d-none");
}


modalQoshish.onclick = () => {
    let taomNomi = document.getElementById("modalTitle").value;
    let soni = parseInt(document.getElementById("modalQuantity").value);
    let narx = parseInt(document.getElementById("modalTotalPrice").value) / soni;

    let umumiyNarh = soni * narx;

    let objModal = {
        tel: userData.tel,
        username: userData.username,
        taomNomi: taomNomi,
        soni: soni,
        narx: narx,
        umumiyNarh: umumiyNarh,
        status: "yetkazilmadi",
        comment: "comment",
    };

    savat.data = [...savat.data, objModal];

    arizaJonatish(savat);

    console.log("modal");
}

// Ariza jonatish


const arizaJonatish = (savat) => {
    savat.data.map((obj) => {
        obj.comment = comment;
        addOrder(obj);
    })
}

export { createModal };