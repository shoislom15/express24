import { userData } from "./userData.js";
import { dnoner, dnone } from "./display.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtm_fjoeKqM0uFIl-afxEzn17qxGB6xF8",
  authDomain: "hakaton-baf94.firebaseapp.com",
  databaseURL:
    "https://hakaton-baf94-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hakaton-baf94",
  storageBucket: "hakaton-baf94.appspot.com",
  messagingSenderId: "996434593732",
  appId: "1:996434593732:web:1d0a0763e157124166c691",
  measurementId: "G-FGMCBKVXHX",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

const main = document.querySelector("#main");
const sign = document.querySelector(".sign");
const userImg = document.querySelector("#userImg");
const userImgLi = document.querySelector("#userImgLi");
const userPage = document.querySelector(".userPage");
const adminPage = document.querySelector(".adminPage");
const adminImg = document.querySelector("#adminImg");
const adminInfoImg = document.querySelector("#adminInfoImg");
const adminInfoName = document.querySelector("#adminInfoName");
const imgName = document.querySelector("#imgName");
const ownerPage = document.querySelector(".ownerPage");

const createUser = (email, pass) => {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      userData.uid = userCredential.user.uid;
      set(ref(db, `users/${userCredential.user.uid}`), {
        username: userData.username,
        email: userData.email,
        img: userData.img,
        uid: userCredential.user.uid,
        degree: userData.degree,
        tel: userData.tel,
      });
      userImg.src = userData.img;
      userImgLi.src = userData.img;
      imgName.innerHTML = userData.username;
      dnoner([main, userPage]);
      dnone([sign, adminPage]);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("signupda up hato");
    });
};
const isSignIn = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const starCountRef = ref(db, `users/${user.uid}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        userData.img = data.img;
        userData.email = data.email;
        userData.username = data.username;
        userData.uid = data.uid;
        userData.degree = data.degree;
        if (userData.degree === "user") {
          dnone([sign, adminPage, ownerPage]);
          dnoner([main, userPage]);
          userImg.src = userData.img;
          userImgLi.src = userData.img;
          imgName.innerHTML = userData.username;
        } else if (data.degree === "admin") {
          adminImg.src = userData.img;
          adminInfoImg.src = userData.img;
          adminInfoName.innerHTML = userData.username;
          dnone([sign, userPage, ownerPage]);
          dnoner([main, adminPage]);
        } else if (data.degree === "owner") {
          ownerImg.src = userData.img;
          ownerInfoImg.src = userData.img;
          ownerInfoName.innerHTML = userData.username;

          dnone([sign, userPage, adminPage]);
          dnoner([main, ownerPage]);
        }
      });
    } else {
      console.warn("no sign in");
    }
  });
};
const enterUser = (email, pass, callback) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const starCountRef = ref(db, `users/${user.uid}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          userImg.src = data.img;
          userImgLi.src = data.img;
          dnone([sign, adminPage, ownerPage]);
          dnoner([main, userPage]);

          callback(data);
        });
      }
    })
    .catch((error) => {
      alert("Password or email failed");
    });
};
const enterAdmin = (email, pass, callback) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const starCountRef = ref(db, `users/${user.uid}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data.degree === "admin") {
            console.log("admin");
            adminImg.src = data.img;
            adminInfoImg.src = data.img;
            adminInfoName.innerHTML = data.username;
            dnone([sign, userPage, ownerPage]);
            dnoner([main, adminPage]);
          } else {
            alert("you are not admin");
          }
          callback(data);
        });
      }
    })
    .catch((error) => {
      alert("Password or email failed");
    });
};
const enterOwner = (email, pass, callback) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const starCountRef = ref(db, `users/${user.uid}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data.degree === "owner") {
            dnone([sign, userPage, adminPage]);
            dnoner([main, ownerPage]);
          } else {
            alert("you are not owner");
          }
          callback(data);
        });
      }
    })
    .catch((error) => {
      alert("Password or email failed");
    });
};

const addCategory = (title) => {
  set(ref(db, `foods/${title}`), {
    category: title,
  });
};
const getCategory = (callback) => {
  const starCountRef = ref(db, `foods`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
const getUsers = (callback) => {
  const starCountRef = ref(db, `users`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
const addFood = (food, obj) => {
  push(ref(db, `foods/${food}`), obj);
};
const removeUser = (id) => {
  remove(ref(db, `users/${id}`));
};
const updateRole = (id, obj) => {
  update(ref(db, `users/${id}`), obj);
};
const addOrder = (obj) => {
  push(ref(db, `arizalar`), obj);
}
export {
  createUser,
  isSignIn,
  enterUser,
  enterAdmin,
  enterOwner,
  addCategory,
  getCategory,
  addFood,
  getUsers,
  removeUser,
  updateRole,
  addOrder,
};