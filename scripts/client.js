import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const timeHour = today.getHours();
const timeMinute = today.getMinutes();
const timeSecond = today.getSeconds();
const userID =
  `${month}` + `${date}` + `${timeHour}` + `${timeMinute}` + `${timeSecond}`;

// Create a reference with the userID as the key
const userRef = ref(database, `client/${userID}`);

let submit = document.getElementById("submit");
let panNumber = document.getElementById("pan");
console.log(panNumber.value);
submit.style.display = "none";

panNumber.addEventListener("input", function () {
  if (panNumber.value.trim() !== "") {
    submitButton.style.display = "inline-block";
  } else {
    submitButton.style.display = "none";
  }
});

let mail = document.getElementById("mail");
let name = document.getElementById("name");
let number = document.getElementById("number");
let nextButton = document.getElementById("next");
nextButton.style.display = "none";
mail.addEventListener("input", function () {
  if (
    mail.value.trim() !== "" &&
    name.value.trim() !== "" &&
    number.value.trim() !== ""
  ) {
    nextButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "none";
  }
});
name.addEventListener("input", function () {
  if (
    mail.value.trim() !== "" &&
    name.value.trim() !== "" &&
    number.value.trim() !== ""
  ) {
    nextButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "none";
  }
});
number.addEventListener("input", function () {
  if (
    mail.value.trim() !== "" &&
    name.value.trim() !== "" &&
    number.value.trim() !== ""
  ) {
    nextButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "none";
  }
});

function submitClientData() {
  const userData = {
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

