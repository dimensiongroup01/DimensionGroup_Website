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
