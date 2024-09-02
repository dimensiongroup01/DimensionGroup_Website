import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
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
const storage = getStorage(app);

let firstName = document.getElementById("wpforms-1251-field_0");
let middleName = document.getElementById("wpforms-1251-field_0-middle");
let lastName = document.getElementById("wpforms-1251-field_0-last");
let addressLineOne = document.getElementById("wpforms-1251-field_6");
let addressLineTwo = document.getElementById("wpforms-1251-field_6-address2");
let city = document.getElementById("wpforms-1251-field_6-city");
let state = document.getElementById("wpforms-1251-field_6-state");
let postalCode = document.getElementById("wpforms-1251-field_6-postal");
let country = document.getElementById("wpforms-1251-field_6-country");
let phoneInput = document.getElementById("wpforms-1251-field_3");
let emailInput = document.getElementById("wpforms-1251-field_2");
let taxStatusInput = document.getElementById("wpforms-1251-field_10");
let beneficiaryNameInput = document.getElementById("wpforms-1251-field_14");
let bankNameInput = document.getElementById("wpforms-1251-field_15");
let branchInput = document.getElementById("wpforms-1251-field_16");
let bankCityInput = document.getElementById("wpforms-1251-field_17");
let accountNoInput = document.getElementById("wpforms-1251-field_21");
let micrCodeInput = document.getElementById("wpforms-1251-field_18");
let ifscCodeInput = document.getElementById("wpforms-1251-field_20");
let accountTypeInput = document.getElementById("wpforms-1251-field_22");
let referenceInput = document.getElementById("wpforms-1251-field_34");
let additionalInfoInput = document.getElementById("wpforms-1251-field_4");
let submitButton = document.getElementById("submit");

let firstNameValue = "";
let middleNameValue = "";
let lastNameValue = "";
let addressLineOneValue = "";
let addressLineTwoValue = "";
let cityValue = "";
let stateValue = "";
let postalCodeValue = "";
let countryValue = "";
let phoneValue = "";
let emailValue = "";
let taxStatusValue = "";
let beneficiaryNameValue = "";
let bankNameValue = "";
let branchValue = "";
let bankCityValue = "";
let accountNoValue = "";
let micrCodeValue = "";
let ifscCodeValue = "";
let accountTypeValue = "";
let referenceInputValue = "";
let additionalInfoInputValue = "";
let adharUpladValue = "";


firstName.addEventListener("input", function () {
    firstNameValue = firstName.value
})

middleName.addEventListener("input", function () {
    middleNameValue = middleName.value
})

lastName.addEventListener("input", function () {
    lastNameValue = lastName.value
})

addressLineOne.addEventListener("input", function () {
    addressLineOneValue = addressLineOne.value
})

addressLineTwo.addEventListener("input", function () {
    addressLineTwoValue = addressLineTwo.value
})

city.addEventListener("input", function () {
    cityValue = city.value
})

state.addEventListener("input", function () {
    stateValue = state.value
})

postalCode.addEventListener("input", function () {
    postalCodeValue = postalCode.value
})

country.addEventListener("input", function () {
    countryValue = country.value
})

phoneInput.addEventListener("input", function () {
    phoneValue = phoneInput.value
})

emailInput.addEventListener("input", function () {
    emailValue = emailInput.value
})

taxStatusInput.addEventListener("input", function () {
    const radioButtons = taxStatusInput.querySelectorAll("input[type='radio']");
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            taxStatusValue = radioButton.value;
            break;
        }
    }
    console.log(taxStatusValue);
})

beneficiaryNameInput.addEventListener("input", function () {
    beneficiaryNameValue = beneficiaryNameInput.value
})

bankNameInput.addEventListener("input", function () {
    bankNameValue = bankNameInput.value
})

branchInput.addEventListener("input", function () {
    branchValue = branchInput.value
})

bankCityInput.addEventListener("input", function () {
    bankCityValue = bankCityInput.value
})

accountNoInput.addEventListener("input", function () {
    accountNoValue = accountNoInput.value
})

micrCodeInput.addEventListener("input", function () {
    micrCodeValue = micrCodeInput.value
})

ifscCodeInput.addEventListener("input", function () {
    ifscCodeValue = ifscCodeInput.value
})

accountTypeInput.addEventListener("input", function () {
    const radioButtons = accountTypeInput.querySelectorAll("input[type='radio']");
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            accountTypeValue = radioButton.value;
            break;
        }
    }
})

referenceInput.addEventListener("input", function () {
    referenceInputValue = referenceInput.value
})

additionalInfoInput.addEventListener("input", function () {
    additionalInfoInputValue = additionalInfoInput.value
})

submitButton.addEventListener("click", () => {
    console.log();

    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const timeHour = today.getHours();
    const timeMinute = today.getMinutes();
    const timeSecond = today.getSeconds();
    const userID =
        `${month}` + `${date}` + `${timeHour}` + `${timeMinute}` + `${timeSecond}`;
    const userRef = ref(database, `partners/${userID}`);

    const userData = {
        firstName: firstNameValue,
        middleName: middleNameValue,
        lastName: lastNameValue,
        addressline1: addressLineOneValue,
        addressline2: addressLineTwoValue,
        city: cityValue,
        state: stateValue,
        postalCode: postalCodeValue,
        country: countryValue,
        phone: phoneValue,
        email: emailValue,
        taxStatus: taxStatusValue,
        beneficiaryName: beneficiaryNameValue,
        bankName: bankNameValue,
        branch: branchValue,
        city: bankCityValue,
        accountNo: accountNoValue,
        micrCode: micrCodeValue,
        ifscCode: ifscCodeValue,
        accountType: accountTypeValue,
        referenceInput: referenceInputValue,
        additionalInfoInput: additionalInfoInputValue,
    };

    console.log(userID)
    // function uploadFilesToFirebase() {
    //     const fileInput = document.getElementById("wpforms-1251-field_23").files[0];
    //     let fileName = fileInput.name
    //     console.log(fileName)
    //     const storageRef = ref(storage, fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, fileInput);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             reload(snapshot);
    //         },
    //         (error) => {
    //             console.log("Error:" + error);
    //         },
    //         () => {
    //             console.log("extra");
    //         }
    //     );
    // }

    // uploadFilesToFirebase()

    set(userRef, userData)
        .then(() => {
            console.log("submitted");
            console.log(userID)
        })
        .catch((error) => {
            console.log("error:", error);
        });
})




