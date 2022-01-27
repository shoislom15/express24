import { dnone, dnoner } from "./display.js";
import {
  addCategory,
  getCategory,
  addFood,
  getUsers,
  updateRole,
  removeUser,
} from "./firebase.js";
import { createElement } from "./global.js";

const usersAdmin = document.querySelector("#usersAdmin");
const deliveryAdmin = document.querySelector("#deliveryAdmin");
const statsticAdmin = document.querySelector("#statsticAdmin");
const plusAdmin = document.querySelector("#plusAdmin");
const applyAdmin = document.querySelector("#applyAdmin");
const taomQoshish = document.querySelector("#taomQoshish");
const kategoriyaQoshish = document.querySelector("#kategoriyaQoshish");
const taomForm = document.querySelector("#taomForm");
const kategoriyaForm = document.querySelector("#kategoriyaForm");
const rasmgaYol = document.querySelector("#rasmgaYol");
const taomNomi = document.querySelector("#taomNomi");
const tarif = document.querySelector("#tarif");
const narxi = document.querySelector("#narxi");
const categorySelect = document.querySelector("#categorySelect");
const taomBtn = document.querySelector("#taomBtn");
const tableBodyUsers = document.querySelector("#tableBodyUsers");

const arizalar = document.querySelector("#arizalar");
const yetkazilgan = document.querySelector("#yetkazilgan");
const statistika = document.querySelector("#statistika");
const qoshish = document.querySelector("#qoshish");
const foydalanuvchilar = document.querySelector("#foydalanuvchilar");
const adminBarBtn = document.querySelector("#adminBar");
const adminSidebar = document.querySelector(".adminSidebar");

applyAdmin.onclick = () => {
  dnoner([arizalar]);
  dnone([yetkazilgan, statistika, qoshish, foydalanuvchilar]);
};
deliveryAdmin.onclick = () => {
  dnoner([yetkazilgan]);
  dnone([arizalar, statistika, qoshish, foydalanuvchilar]);
};
statsticAdmin.onclick = () => {
  dnoner([statistika]);
  dnone([arizalar, yetkazilgan, qoshish, foydalanuvchilar]);
};
plusAdmin.onclick = () => {
  dnoner([qoshish]);
  dnone([arizalar, yetkazilgan, statistika, foydalanuvchilar]);
};
usersAdmin.onclick = () => {
  dnoner([foydalanuvchilar]);
  dnone([arizalar, yetkazilgan, statistika, qoshish]);
  getUsers(renderUsers);
};
taomQoshish.onclick = () => {
  dnoner([taomForm]);
  dnone([kategoriyaForm]);
  kategoriyaQoshish.classList.remove("btn-yellow");
};
kategoriyaQoshish.onclick = () => {
  dnone([taomForm]);
  dnoner([kategoriyaForm]);
  taomQoshish.classList.remove("btn-yellow");
};

kategoriyaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(kategoriyaQoshishInput.value);
  addCategory(kategoriyaQoshishInput.value);
  kategoriyaForm.reset();
});

taomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addFood(categorySelect.value, {
    url: rasmgaYol.value,
    name: taomNomi.value,
    def: tarif.value,
    price: narxi.value,
  });
  taomForm.reset();
});
const selectRender = (data) => {
  categorySelect.innerHTML = "";
  Object.entries(data).map((item) => {
    const option = createElement("option", "", `${item[0]}`, categorySelect);
  });
};
const renderUsers = (data) => {
  tableBodyUsers.innerHTML = "";
  let count = 0;
  Object.entries(data).map((el) => {
    count++;
    const tr = createElement("tr", "w-100", "", tableBodyUsers);
    createElement("td", "", `${count}`, tr);
    createElement("td", "", `${el[1].username}`, tr);
    createElement("td", "", `${el[1].tel}`, tr);
    const rolTd = createElement("td", "", "", tr);

    const inputRol = createElement("input", "", ``, rolTd);
    inputRol.value = ` ${el[1].degree}`;
    inputRol.readOnly = true;
    const btnTd = createElement("td", "d-flex align-items-center", "", tr);
    const check = createElement(
      "button",
      "btn d-none",
      ` <i class="fas fa-check"></i>`,
      btnTd
    );
    const edit = createElement(
      "button",
      "btn",
      ` <i class="fas fa-edit"></i>`,
      btnTd
    );
    edit.onclick = () => {
      inputRol.readOnly = false;
      inputRol.focus();
      dnoner([check]);
      dnone([edit]);
    };
    const trash = createElement(
      "button",
      "btn",
      ` <i class="fas fa-trash "></i>`,
      btnTd
    );
    check.onclick = () => {
      dnoner([edit]);
      dnone([check]);
      updateRole(el[1].uid, { degree: inputRol.value.trim() });
    };
    trash.onclick = () => {
      console.log(el[1].uid);
      if (el[1].degree !== "admin") removeUser(el[1].uid);
    };
  });
};
console.log(adminBarBtn);
adminBarBtn.onclick = () => {
  console.log("121212");
  adminSidebar.classList.toggle("sidebarHide");
};

getCategory(selectRender);
