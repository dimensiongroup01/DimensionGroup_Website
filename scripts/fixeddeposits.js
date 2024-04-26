function calculateInterest(
  principal,
  interestRate,
  timeInMonths,
  compounding = "simple"
) {
  // Input validation (optional, but recommended)
  if (isNaN(principal) || isNaN(interestRate) || isNaN(timeInMonths)) {
    throw new Error("Inputs must be numbers");
  }

  // Convert annual interest rate to a monthly interest rate
  let monthlyInterestRate = interestRate / 100 / 12;

  let finalAmount;

  if (compounding === "simple") {
    // Simple interest formula (adjusted for months)
    finalAmount = principal * (1 + monthlyInterestRate * timeInMonths);
  } else if (compounding === "compound") {
    // Compound interest formula (adjusted for months)
    finalAmount = principal * Math.pow(1 + monthlyInterestRate, timeInMonths);
  } else {
    throw new Error("Invalid compounding type. Choose 'simple' or 'compound'");
  }

  // Return the result, rounded to two decimal places for currency
  return finalAmount.toFixed(2);
}

let principal = 30000;
let interestRate = 7; // 5% interest rate
let timeInMonths = 24; // 18 months
let compoundingType = "simple";

let finalAmount = calculateInterest(
  principal,
  interestRate,
  timeInMonths,
  compoundingType
);
console.log(finalAmount);

// Function to initialize the calculator
function initializeCalculator() {
  var principalInput = document.getElementById("principal");
  var slider = document.getElementById("slider");

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
}

// Function to calculate interest
function calculateInterest() {
  // Get input values
  var principal = parseFloat(document.getElementById("principal").value);
  var time = parseInt(document.getElementById("time").value);
  var bank = document.getElementById("bank").value;

  // Validate input against maximum limit
  var maxLimit = parseFloat(
    document.getElementById("principal").getAttribute("max")
  );
  if (principal > maxLimit) {
    alert("Amount cannot exceed the maximum limit of " + maxLimit);
    return;
  }

  // Calculate interest
  var interestRate = getInterestRate(bank, time);
  var interest = (principal * interestRate * time) / 100;

  // Display result
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Interest: " + interest.toFixed(2);
}

// Function to initialize the calculator
function initializeCalculator() {
  var principalInput = document.getElementById("principal");
  var slider = document.getElementById("slider");

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
}

// Function to calculate interest
function calculateInterest() {
  // Get input values
  var principal = parseFloat(document.getElementById("principal").value);
  var time = parseInt(document.getElementById("time").value);
  var bank = document.getElementById("bank").value;

  // Validate input against maximum limit
  var maxLimit = parseFloat(
    document.getElementById("principal").getAttribute("max")
  );
  var minLimit = parseFloat(
    document.getElementById("principal").getAttribute("min")
  );
  if (principal < minLimit || principal > maxLimit) {
    alert("Amount not in valid limit");
    return;
  }

  // Calculate interest
  var interestRate = getInterestRate(bank, time);
  var interest = (principal * interestRate * time) / 100;

  // Display result
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Interest: " + interest.toFixed(2);
}

// Function to get interest rate based on bank and time
function getInterestRate(bank, time) {
  // Define interest rates for different banks and time periods
  var rates = {
    PNB: {
      12: 5,
      18: 6,
      24: 6.5,
      30: 7,
      36: 7.5,
      42: 8,
      48: 8.5,
    },
    Bajaj: {
      12: 6,
      18: 6.5,
      24: 7,
      30: 7.5,
      36: 8,
      42: 8.5,
      48: 9,
    },
    LIC: {
      12: 7,
      18: 7.5,
      24: 8,
      30: 8.5,
      36: 9,
      42: 9.5,
      48: 10,
    },
    // Add more banks and their rates as needed
  };

  return rates[bank][time] || 0; // Return 0 if bank or time period is not found in rates
}

// Initialize the calculator
initializeCalculator();
