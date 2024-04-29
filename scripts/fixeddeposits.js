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
}

let interestValue, principal, totalAmount;
// Function to calculate interest
function calculateInterest() {
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

  // Calculate interest
  let interestRate = getInterestRate(bank, time);
  let interest = (principal * interestRate * (time / 12)) / 100;
  interestValue = parseFloat(interest.toFixed(2));
  // Display result
  let resultDiv = document.getElementById("result");
  totalAmount = principal + interestValue;
  resultDiv.innerHTML = `Total amount: ${totalAmount.toFixed(2)}`;
}

// Function to get interest rate based on bank and time
function getInterestRate(bank, time) {
  // Define interest rates for different banks and time periods
  let rates = {
    PNB: { 12: 7.85, 18: 6, 24: 6.5, 30: 7, 36: 7.5, 42: 8, 48: 8.5 },
    Bajaj: { 12: 6, 18: 6.5, 24: 7, 30: 7.5, 36: 8, 42: 8.5, 48: 9 },
    LIC: { 12: 7, 18: 7.5, 24: 8, 30: 8.5, 36: 9, 42: 9.5, 48: 10 },
    // Add more banks and their rates as needed
  };

  return rates[bank][time] || 0; // Return 0 if bank or time period is not found in rates
}

initializeCalculator();

let principalInput = document.getElementById("principal");
let slider = document.getElementById("slider");
let calButton = document.getElementById("calc-interest");

// default calculator
calculateInterest();

// listen input change
principalInput.addEventListener("input", calculateInterest);
slider.addEventListener("input", calculateInterest);
calButton.addEventListener("click", calculateInterest);

function createPieChart(principal, interestValue) {
  // console.log(principal, interestValue);
  let ctx = document.getElementById("pieChart").getContext("2d");
  let interestPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [principal, interestValue],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)", // Red for Principal
            "rgba(54, 162, 235, 0.6)", // Blue for Interest
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Breakdown of Total Amount",
      },
    },
  });
}
export { interestValue, principal, totalAmount };
