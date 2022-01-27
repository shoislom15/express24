import { dnone, dnoner } from "./display.js";

const ownerSidebarBtn = document.querySelector("#ownerSidebarBtn");
const ownerSidebar = document.querySelector(".ownerSidebar");
const applyOwner = document.querySelector("#applyOwner");
const deliveryOwner = document.querySelector("#deliveryOwner");
const arizalarOwner = document.querySelector("#arizalarOwner");
const yetkazilganOwner = document.querySelector("#yetkazilganOwner");

ownerSidebarBtn.onclick = () => {
  ownerSidebar.classList.toggle("sidebarHide");
};
applyOwner.onclick = () => {
  dnone([yetkazilganOwner]);
  dnoner([arizalarOwner]);
};

deliveryOwner.onclick = () => {
  dnone([arizalarOwner]);
  dnoner([yetkazilganOwner]);
};
