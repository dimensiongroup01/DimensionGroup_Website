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
      1: "",
      2: 7.27,
      3: "",
      4: 7.32,
      5: "",
      6: "",
      7: "",
      8: "",
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
      1: 7.85,
      2: 8.16,
      3: 8.49,
      4: 8.88,
      5: 9.49,
      6: 9.75,
      7: "",
      8: 10.5,
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

    for (let i = 1; i < cells.length - 1; i++) {
      // Updatting the text content of each cell with the corresponding rate
      let rate =
        type === "Cumulative" ? cumulativeRates[i] : nonCumulativeRates[i];
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
}

let interest, principal, totalAmount;
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

  // Display result
  let resultDiv = document.getElementById("result");
  totalAmount = principal + interest;
  resultDiv.innerHTML = `Total amount: ${totalAmount.toFixed(2)}`;
  console.log(interest);
  clearCanvas();
  // Update the pie chart with the new values
  createPieChart(principal, interest);
}

// Function to get interest rate based on bank and time
function getInterestRate(bank, time) {
  // Define interest rates for different banks and time periods
  let rates = {
    PNB: { 12: 7.85, 18: 7.7, 24: 7.5, 30: 7.9, 36: 7.5, 42: 8, 48: 8.5 },
    Bajaj: { 12: 6.85, 18: 9.7, 24: 8.5, 30: 8.9, 36: 7.5, 42: 8, 48: 8.5 },
    LIC: { 12: 7.5, 18: 7, 24: 715, 30: 8.5, 36: 8.5, 42: 8.1, 48: 8.5 },
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

function createPieChart(principal, interest) {
  const ctx = document.getElementById("pieChart").getContext("2d");
  // Destroy existing chart if it exists
  if (interestPieChart) {
    interestPieChart.destroy();
  }
  // console.log(principal, interest);
  interestPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [principal, interest],
          backgroundColor: [
            "#379BD6", // Blue for Interest
            "rgb(224, 224, 224)", // Red for Principal
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

function updatePieChart(principal, interest) {
  // Check if a chart exists
  if (interestPieChart) {
    // Update chart data
    interestPieChart.data.datasets[0].data = [principal, interest];
    interestPieChart.update();
  } else {
    // Create new chart if it doesn't exist
    createPieChart(principal, interest);
  }
}

function clearCanvas() {
  let canvas = document.getElementById("pieChart");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
