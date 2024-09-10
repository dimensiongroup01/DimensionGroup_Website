import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
import {
  getDatabase,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvlSSduzGaNjaaYkSHTOdcVnlRBd39j5U",
  authDomain: "dimension01-7a7b4.firebaseapp.com",
  databaseURL:
    "https://dimension01-7a7b4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dimension01-7a7b4",
  storageBucket: "dimension01-7a7b4.appspot.com",
  messagingSenderId: "628507138263",
  appId: "1:628507138263:web:ac1eec54ae6207685d7892",
  measurementId: "G-LCQ4KW3JKY",
};

//************************************** */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const storageRef = ref(storage, "gs://dimension01-7a7b4.appspot.com");
const database = getDatabase(app);

let upload = document.getElementById("click");
upload.addEventListener("click", uploadFilesToFirebase);

function uploadFilesToFirebase() {
  const fileInput = document.getElementById("fileInput").files[0];
  console.log(fileInput);
  const storageRef = ref(storage, fileInput.name);
  const uploadTask = uploadBytesResumable(storageRef, fileInput);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      reload(snapshot);
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
  let progressCount = document.getElementById("click");
  console.log(progress);

  progressCount.innerText = `${progress.toFixed(1)}` + "% Done";
  if (progress == 100) {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}