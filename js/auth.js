import { dnone, dnoner } from "./display.js";
import {
  createUser,
  isSignIn,
  enterUser,
  enterAdmin,
  enterOwner,
} from "./firebase.js";
import { userData } from "./userData.js";
//#region consts
const signupForm = document.querySelector("#signupForm");
const signinForm = document.querySelector("#signinForm");
const signupEmail = document.querySelector("#signupEmail");
const signupUsername = document.querySelector("#signupUsername");
const signupPassword = document.querySelector("#signupPassword");
const signupTel = document.querySelector("#signupTel");
const signupImg = document.querySelector("#signupImg");
const userBtn = document.querySelector("#userBtn");
const userInfo = document.querySelector(".userInfo");
const userInfoName = document.querySelector("#userInfoName");
const logoutBtn = document.querySelector("#logoutBtn");
const sign = document.querySelector(".sign");
const signinBtn = document.querySelector("#signinBtn");
const signupBtn = document.querySelector("#signupBtn");
const signinUserBtn = document.querySelector("#signinUserBtn");
const signinAdminBtn = document.querySelector("#signinAdminBtn");
const signinEmail = document.querySelector("#signinEmail");
const signinPassword = document.querySelector("#signinPassword");
const signup = document.querySelector(".signup");
const signin = document.querySelector(".signin");
const userPage = document.querySelector(".userPage");
const adminImg = document.querySelector("#adminImg");
const adminBtn = document.querySelector("#adminBtn");
const adminInfo = document.querySelector(".adminInfo");
const logoutBtnAdmin = document.querySelector("#logoutBtnAdmin");
const adminPage = document.querySelector(".adminPage");
const signinOwnerBtn = document.querySelector("#signinOwnerBtn");
const ownerPage = document.querySelector(".ownerPage");
const logoutBtnOwner = document.querySelector("#logoutBtnOwner");
const ownerInfo = document.querySelector(".ownerInfo");
const ownerBtn = document.querySelector("#ownerBtn");

const body = document.querySelector("body");
//#region
//#region functions

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userData.email = signupEmail.value;
  userData.username = signupUsername.value;
  userData.img = signupImg.value;
  userData.password = signupPassword.value;
  userData.tel = signupTel.value;
  createUser(userData.email, userData.password);
  signupForm.reset();
});
body.onload = () => {
  isSignIn();
};
userBtn.onclick = () => {
  userInfoName.innerHTML = userData.username;
  userInfo.classList.toggle("d-none");
};
adminBtn.onclick = () => {
  adminInfo.classList.toggle("d-none");
};
ownerBtn.onclick = () => {
  ownerInfo.classList.toggle("d-none");
};
logoutBtn.onclick = () => {
  dnone([main, userInfo]);
  dnoner([sign]);
};
signinBtn.onclick = () => {
  dnone([signup]);
  dnoner([signin]);
};
signupBtn.onclick = () => {
  dnone([signin]);
  dnoner([signup]);
};
signinUserBtn.onclick = (e) => {
  e.preventDefault();
  enterUser(signinEmail.value, signinPassword.value, setUserdata);
  signinForm.reset();
};
signinAdminBtn.onclick = (e) => {
  e.preventDefault();
  enterAdmin(signinEmail.value, signinPassword.value, setUserdata);
  signinForm.reset();
};
logoutBtnAdmin.onclick = () => {
  dnone([adminPage, adminInfo]);
  dnoner([sign]);
};
signinOwnerBtn.onclick = (e) => {
  e.preventDefault();
  enterOwner(signinEmail.value, signinPassword.value, setUserdata);
  signinForm.reset();
};
logoutBtnOwner.onclick = () => {
  dnone([ownerPage, ownerInfo]);
  dnoner([sign]);
};
const setUserdata = (obj) => {
  (userData.username = obj.username),
    (userData.email = obj.email),
    (userData.img = obj.img),
    (userData.uid = obj.uid),
    (userData.degree = obj.degree);
};
