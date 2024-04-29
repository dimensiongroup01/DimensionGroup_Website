let rateData = {
  bajaj: {
    cumulative: {
      1: 8.4,
      2: 8.5,
      3: 8.8,
      4: 8.9,
      5: 8.65,
      6: 8.98,
      7: 8.52,
      8: 8.21,
    },
    nonCumulative: {
      1: 7.65,
      2: 7.98,
      3: 7.52,
      4: 7.21,
      5: 7.65,
      6: 7.98,
      7: 7.52,
      8: 7.21,
    },
  },
  pnb: {
    cumulative: {
      1: 6.4,
      2: 6.5,
      3: 6.8,
      4: 6.9,
      5: 6.65,
      6: 6.98,
      7: 6.52,
      8: 6.21,
    },
    nonCumulative: {
      1: 5.4,
      2: 5.4,
      3: 5.4,
      4: 5.4,
      5: 5.65,
      6: 5.98,
      7: 5.52,
      8: 5.21,
    },
  },
  lic: {
    cumulative: {
      1: 4.4,
      2: 4.5,
      3: 4.8,
      4: 4.9,
      5: 4.65,
      6: 4.98,
      7: 4.52,
      8: 4.21,
    },
    nonCumulative: {
      1: 5.4,
      2: 5.4,
      3: 5.4,
      4: 5.4,
      5: 5.65,
      6: 5.98,
      7: 5.52,
      8: 5.21,
    },
  },
  shriram: {
    cumulative: {
      1: 6.4,
      2: 6.5,
      3: 6.8,
      4: 6.9,
      5: 6.65,
      6: 6.98,
      7: 6.52,
      8: 6.21,
    },
    nonCumulative: {
      1: 8.4,
      2: 8.5,
      3: 8.8,
      4: 8.9,
      5: 8.65,
      6: 8.98,
      7: 8.52,
      8: 8.21,
    },
  },
};

let type = "Cumulative";
let objectName = Object.keys(rateData)[0];

function updateTable(type, rateData) {
  // console.log(type);
  // Get the row element
  let timeline = document.getElementById("timeline");
  timeline.innerText = "Timeline  " + `(${type})`;
  for (const [company, companyData] of Object.entries(rateData)) {
    let cumulativeRates = companyData.cumulative;
    let nonCumulativeRates = companyData.nonCumulative;
    let row = document.getElementById(`${company}-rates`);
    let cells = row.getElementsByTagName("td");

    for (let i = 1; i < cells.length - 1; i++) {
      // Updatting the text content of each cell with the corresponding rate
      let rate =
        type === "Cumulative" ? cumulativeRates[i] : nonCumulativeRates[i];
      cells[i].textContent = rate !== undefined ? rate : "-";
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
}

let interestValue, principal, totalAmount;
let interestPieChart; // Declare interestPieChart outside the function to access it globally

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
  console.log(principal);
  clearCanvas();

  // Update the pie chart with the new values
  createPieChart(principal, interestValue);
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
  // Check if interestPieChart exists and destroy it
  if (interestPieChart) {
    interestPieChart.destroy();
  }
  // Get the canvas element
  const ctx = document.getElementById("pieChart").getContext("2d");

  // Create the new Chart instance
  interestPieChart = new Chart(ctx, {
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

function clearCanvas() {
  let canvas = document.getElementById("pieChart");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
