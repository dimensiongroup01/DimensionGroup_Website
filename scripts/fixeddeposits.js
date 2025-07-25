let rateData = {
  bajaj: {
    cumulative: {
      1: "",
      2: 7.4,
      3: "",
      4: 7.45,
      5: "",
      6: "",
      7: "",
      8: "",
    },
    nonCumulative: {
      1: 7.4,
      2: 7.5,
      3: 7.55,
      4: 7.45,
      5: 8.05,
      6: 8.05,
      7: 8.05,
      8: 8.05,
    },
  },
  pnb: {
    cumulative: {
      1: 7.75,
      2: 7.75,
      3: 8.05,
      4: 8.06,
      5: 8.6,
      6: 8.6,
      7: 8.76,
      8: 9.12,
    },
    nonCumulative: {
      1: 7.75,
      2: 7.75,
      3: 7.75,
      4: 7.75,
      5: 7.95,
      6: 7.95,
      7: 7.8,
      8: 7.8,
    },
  },
  lic: {
    cumulative: {
      1: 7.25,
      2: 7.35,
      3: 7.6,
      4: "",
      5: 7.75,
      6: "",
      7: "",
      8: 7.75,
    },
    nonCumulative: {
      1: 7.25,
      2: 7.35,
      3: 7.6,
      4: "",
      5: 7.75,
      6: "",
      7: "",
      8: 7.75,
    },
  },
  shriram: {
    cumulative: {
      1: 7.35,
      2: 7.53,
      3: 7.78,
      4: 8.66,
      5: 9.39,
      6: "",
      7: "",
      8: "",
    },
    nonCumulative: {
      1: 7.85,
      2: 8.0,
      3: 8.15,
      4: 8.35,
      5: 8.7,
      6: 8.75,
      7: "",
      8: 8.8,
    },
  },
};

let type = "Cumulative";
let objectName = Object.keys(rateData)[0];
let additionalRate = document.getElementById("additional-rates");
let bank = document.getElementById("bank")
let seniorCitizenRate = 0;
let womanRate = 0;
bank.addEventListener("change", () => {
  if (bank.value == "Shriram") {
    additionalRate.style.display = "block"
  } else {
    additionalRate.style.display = "none"
    seniorCitizenRate = 0;
    womanRate = 0;
    console.log(womanRate)
  }
})

function updateTable(type, rateData) {
  // console.log(type);
  // Get the row element
  let timeline = document.getElementById("timeline"); //update the timeline heading in table
  timeline.innerText = "Timeline  " + `(${type})`;
  for (const [company, companyData] of Object.entries(rateData)) {
    let cumulativeRates = companyData.cumulative;
    let nonCumulativeRates = companyData.nonCumulative;
    let row = document.getElementById(`${company}-rates`);
    let cells = row.getElementsByTagName("td");

    for (let i = 2; i < cells.length - 1; i++) {
      // Updatting the text content of each cell with the corresponding rate
      let rate =
        type === "Cumulative"
          ? cumulativeRates[i - 1]
          : nonCumulativeRates[i - 1];
      cells[i].textContent = rate !== "" ? rate : "--";
    }
  }
}

// Call the function with the sample JSON data
updateTable(type, rateData);
document
  .getElementById("cumulative-button")
  .addEventListener("click", function () {
    updateTable("Cumulative", rateData);
  });

document
  .getElementById("nonCumulative-button")
  .addEventListener("click", function () {
    updateTable("NonCumulative", rateData);
  });

// Initial call and event listener setup remain the same.
function initializeCalculator() {
  let principalInput = document.getElementById("principal");
  let slider = document.getElementById("slider");

  // Set initial value for slider based on input field
  slider.value = principalInput.value;

  // Add event listener to input field
  principalInput.addEventListener("input", function () {
    // Update slider value when input field changes
    slider.value = this.value;
  });

  // Add event listener to slider
  slider.addEventListener("input", function () {
    // Update input field value when slider changes
    principalInput.value = this.value;
  });
  let sliderMonth = document.getElementById("time");
  let numberOfMonth = document.getElementById("numberOfMonth");

  // Set the initial value of numberOfMonth based on the value of sliderMonth
  numberOfMonth.innerHTML = "Number of Months: " + sliderMonth.value;

  // Add an event listener to sliderMonth to update numberOfMonth when its value changes
  sliderMonth.addEventListener("input", function () {
    numberOfMonth.innerHTML = "Number of Months: " + sliderMonth.value;
  });
}

let interest, principal

// Function to calculate interest
function calculateInterest() {
  let totalReturn ;
  // Get input values
  principal = parseFloat(document.getElementById("principal").value);
  let time = parseInt(document.getElementById("time").value);
  let bank = document.getElementById("bank").value;


  // Validate input against maximum limit
  let maxLimit = parseFloat(
    document.getElementById("principal").getAttribute("max")
  );
  let minLimit = parseFloat(
    document.getElementById("principal").getAttribute("min")
  );
  if (principal < minLimit || principal > maxLimit) {
    alert("Amount not in valid limit");
    return;
  }
  let interestRate;
  // Calculate interest
  let interest;
  // for (let t = 12; t <= time; t += 6) {
  //   interestRate = getInterestRate(bank, t) + womanRate + seniorCitizenRate;
  //   interest = (principal * interestRate * (t / 12)) / 100;
  //   timeInMonths.push(t);
  //   interestValue.push(interest);
  //   totalReturn.push(principal + interest);
  // }
  interestRate = getInterestRate(bank, time) + womanRate + seniorCitizenRate;
  interest = (principal * interestRate * (time / 12)) / 100;
  totalReturn = principal + interest;


  let principalDeg = ((principal/totalReturn)*100)*360/100;
  console.log(principalDeg)
  let resultDiv = document.getElementById("result");
  
  resultDiv.innerHTML = `Total amount: ${totalReturn.toFixed(2)}`;

  let circle = document.getElementById("circle");
 circle.style.backgroundImage = `conic-gradient(#379BD6 ${principalDeg}deg, #c1c1c1 1deg)`
  let text = document.getElementById("text")
  let interestText = document.getElementById("interestAmount")
  let principalText = document.getElementById("principalAmount")

  text.innerText = `${interestRate.toFixed(2)}` + `%`
  interestText.innerText = `Interest amount => Rs ${interest}`
  principalText.innerText = `Principal amount => Rs ${principal}`


 
}

// Function to get interest rate based on bank and time
function getInterestRate(bank, time) {
  // Define interest rates for different banks and time periods
  let rates = {
    PNB: {
      12: 7.75,
      18: 7.75,
      24: 7.75,
      30: 7.75,
      36: 7.95,
      42: 7.95,
      48: 7.8,
      54: 7.8,
      60: 7.8,
    },

    Bajaj: {
      12: 7.4,
      18: 7.4,
      24: 7.55,
      30: 7.45,
      36: 8.05,
      42: 8.05,
      48: 8.05,
      54: 8.05,
      60: 8.05,
    },
    LIC: {
      12: 7.25,
      18: 7.35,
      24: 7.6,
      30: 7.6,
      36: 7.75,
      42: 7.75,
      48: 7.75,
      54: 7.75,
      60: 7.75,
    },
    Shriram: {
      12: 7.85,
      18: 8.0,
      24: 8.15,
      30: 8.35,
      36: 8.7,
      42: 8.75,
      48: 8.75,
      54: 8.75,
      60: 8.8,
    },
    // Add more banks and their rates as needed
  };

  return rates[bank][time] || 0; // Return 0 if bank or time period is not found in rates
}

initializeCalculator();
let seniorCitizen = document.getElementById("seniorCitizen");
let woman = document.getElementById("woman");

if (seniorCitizen) {
  seniorCitizen.addEventListener("change", () => {
    if (seniorCitizen.checked) {
      seniorCitizenRate = 0.5
    } else {
      seniorCitizenRate = 0
    }
  })
}

if (woman) {
  woman.addEventListener("change", () => {
    if (woman.checked) {
      womanRate = 0.1
    } else {
      womanRate = 0.0
    }
  })
}


let principalInput = document.getElementById("principal");
let slider = document.getElementById("slider");
let calButton = document.getElementById("calc-interest");
// default calculator
calculateInterest();

calButton.addEventListener("click", calculateInterest);
// sliderMonth.addEventListener("mouseleave", calculateInterest);
