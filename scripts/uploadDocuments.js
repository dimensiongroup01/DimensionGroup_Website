import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

let firstName = document.getElementById("wpforms-1251-field_0");
let firstNameValue = "";
firstName.addEventListener("input", function () {
    firstNameValue = firstName.value
})
let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
    uploadFilesToFirebase()
})

function uploadFilesToFirebase() {
    console.log("input starts")
    const fileInput = document.getElementById("wpforms-1251-field_23").files[0];
    console.log(fileInput)
    const storageRef = ref(storage, `users/${firstNameValue}`);
    const uploadTask = uploadBytesResumable(storageRef, fileInput);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // reload(snapshot);
        },
        (error) => {
            // ... your error handling code
            console.log("Error:" + error);
        },
        () => {
            console.log("extra");
        }
    );
}

function reload(snapshot) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);

    progressCount.innerText = `${progress.toFixed(1)}` + "% Done";
    if (progress == 100) {
        console.log("Upload done")
    }
}
