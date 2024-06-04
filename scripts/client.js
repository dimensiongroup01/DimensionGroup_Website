// import ConfettiGenerator from "confetti-js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwAyhn4kyD5PZNE00-tWwww6oLRy3mp2U",
  authDomain: "client-data-22e7f.firebaseapp.com",
  databaseURL:
    "https://client-data-22e7f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "client-data-22e7f",
  storageBucket: "client-data-22e7f.appspot.com",
  messagingSenderId: "871665762975",
  appId: "1:871665762975:web:0244983375d356a25958aa",
};

// var confettiSettings = { target: 'my-canvas' };
// var confetti = new ConfettiGenerator(confettiSettings);

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("hello");

const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const timeHour = today.getHours();
const timeMinute = today.getMinutes();
const timeSecond = today.getSeconds();
const userID =
  `${month}` + `${date}` + `${timeHour}` + `${timeMinute}` + `${timeSecond}`;
console.log(userID);

// Create a reference with the userID as the key
const userRef = ref(database, `client/${userID}`);

function submitClientData() {
  let name = document.getElementById("name");
  let mail = document.getElementById("mail");
  let number = document.getElementById("number");
  let panNumber = document.getElementById("pan");

  const userData ={
    fullName: `${name.value}`,
    email: `${mail.value}`,
    number: `${number.value}`,
    panNumber: `${panNumber.value}`,
  };
  set(userRef, userData)
    .then(() => {
      console.log("submitted");
    })
    .catch((error) => {
      console.log("error:", error);
    });

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3100);
}

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitClientData);
